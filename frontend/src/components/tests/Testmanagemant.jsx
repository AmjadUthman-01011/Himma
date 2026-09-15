"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import TestHeader from "./TestHeader";
import TestFilters from "./TestFilter";
import TestTable from "./Table";
import TestPagination from "./Pagination";

import CreateTestModal from "./CreateTestModal";
import EditTestModal from "./EditTestModal";
import DeleteTestModal from "./DeleteTestModal";

import {
  getTests,
  createTest,
  updateTest,
  deleteTest,
} from "../../services/tests.service";

import { getCourses } from "../../services/courses.service";
import { getTeachers } from "../../services/teachers.service";

// =====================================================
// TEST MANAGEMENT
// =====================================================

export default function TestManagement() {
  // =====================================================
  // DATA
  // =====================================================

  const [tests, setTests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // =====================================================
  // UI STATE
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FILTERS
  // =====================================================

  const [search, setSearch] = useState("");
  const [courseId, setCourseId] = useState("ALL");

  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] = useState(1);

  const limit = 10;

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  // =====================================================
  // MODALS
  // =====================================================

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  const [editModalOpen, setEditModalOpen] =
    useState(false);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [selectedTest, setSelectedTest] =
    useState(null);

  // =====================================================
  // FETCH TESTS
  // =====================================================

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit,
        search,
      };

      if (courseId !== "ALL") {
        params.courseId = Number(courseId);
      }

      const response = await getTests(params);

      console.log("Tests response:", response);

      // IMPORTANT:
      // Backend returns:
      // {
      //   success: true,
      //   data: [],
      //   pagination: {}
      // }

      setTests(response?.data || []);

      setPagination({
        total: response?.pagination?.total || 0,
        totalPages:
          response?.pagination?.totalPages || 1,
      });
    } catch (err) {
      console.error(
        "Failed to fetch tests:",
        err
      );

      setError(
        err.message ||
          "Failed to load tests"
      );

      setTests([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, courseId]);

  // =====================================================
  // FETCH COURSES + TEACHERS
  // =====================================================

  const fetchFormData = useCallback(async () => {
    try {
      const [courseResponse, teacherResponse] =
        await Promise.all([
          getCourses({
            page: 1,
            limit: 100,
          }),
          getTeachers(),
        ]);
        //console.log(teacherResponse)
      setCourses(
        courseResponse?.courses ||
          courseResponse?.data ||
          []
      );

      setTeachers(
        teacherResponse?.teachers ||
          teacherResponse?.data ||
          []
      );
    } catch (err) {
      console.error(
        "Failed to fetch test form data:",
        err
      );
    }
  }, []);

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  // =====================================================
  // COURSE FILTER
  // =====================================================

  const handleCourseChange = (value) => {
    setCourseId(value);
    setPage(1);
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const handleClearFilters = () => {
    setSearch("");
    setCourseId("ALL");
    setPage(1);
  };

  // =====================================================
  // CREATE TEST
  // =====================================================

  const handleCreateTest = async (formData) => {
    try {
      await createTest(formData);

      setCreateModalOpen(false);

      await fetchTests();
    } catch (err) {
      console.error(
        "Create test error:",
        err
      );

      throw err;
    }
  };

  // =====================================================
  // EDIT TEST
  // =====================================================

  const handleEditTest = async (formData) => {
    if (!selectedTest) return;

    try {
      await updateTest(
        selectedTest.id,
        formData
      );

      setEditModalOpen(false);
      setSelectedTest(null);

      await fetchTests();
    } catch (err) {
      console.error(
        "Update test error:",
        err
      );

      throw err;
    }
  };

  // =====================================================
  // DELETE TEST
  // =====================================================

  const handleDeleteTest = async () => {
    if (!selectedTest) return;

    try {
      await deleteTest(
        selectedTest.id
      );

      setDeleteModalOpen(false);
      setSelectedTest(null);

      // If deleting the last item on page
      if (
        tests.length === 1 &&
        page > 1
      ) {
        setPage(
          (currentPage) =>
            currentPage - 1
        );
      } else {
        await fetchTests();
      }
    } catch (err) {
      console.error(
        "Delete test error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete test"
      );
    }
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEditModal = (test) => {
    if (!test) return;

    setSelectedTest(test);
    setEditModalOpen(true);
  };

  // =====================================================
  // OPEN DELETE
  // =====================================================

  const openDeleteModal = (test) => {
    if (!test) return;

    setSelectedTest(test);
    setDeleteModalOpen(true);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f9fb]">

      <main>

        {/* HEADER */}

        <TestHeader
          onCreateTest={() =>
            setCreateModalOpen(true)
          }
        />

        {/* FILTERS */}

        <TestFilters
          search={search}
          courseId={courseId}
          courses={courses}
          onSearchChange={
            handleSearchChange
          }
          onCourseChange={
            handleCourseChange
          }
          onClear={
            handleClearFilters
          }
        />

        {/* ERROR */}

        {error && (
          <div className="mx-5 mb-5 rounded-lg border border-[#ffdad6] bg-[#ffdad6]/50 px-4 py-3 text-sm text-[#93000a] sm:mx-6">
            {error}
          </div>
        )}

        {/* TABLE */}

        <TestTable
          tests={tests}
          loading={loading}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />

        {/* PAGINATION */}

        {!loading &&
          pagination.total > 0 && (
            <TestPagination
              page={page}
              totalPages={
                pagination.totalPages
              }
              total={
                pagination.total
              }
              limit={limit}
              onPageChange={setPage}
            />
          )}

        {/* CREATE */}

        <CreateTestModal
          open={createModalOpen}
          courses={courses}
          teachers={teachers}
          onClose={() =>
            setCreateModalOpen(false)
          }
          onSubmit={
            handleCreateTest
          }
        />

        {/* EDIT */}

        {editModalOpen &&
          selectedTest && (
            <EditTestModal
              open={editModalOpen}
              test={selectedTest}
              courses={courses}
              teachers={teachers}
              onClose={() => {
                setEditModalOpen(false);
                setSelectedTest(null);
              }}
              onSubmit={
                handleEditTest
              }
            />
          )}

        {/* DELETE */}

        {deleteModalOpen &&
          selectedTest && (
            <DeleteTestModal
              open={deleteModalOpen}
              test={selectedTest}
              onClose={() => {
                setDeleteModalOpen(false);
                setSelectedTest(null);
              }}
              onConfirm={
                handleDeleteTest
              }
            />
          )}

      </main>

    </div>
  );
}