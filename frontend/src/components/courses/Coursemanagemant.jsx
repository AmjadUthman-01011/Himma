"use client";

import { useCallback, useEffect, useState } from "react";

import CourseHeader from "./CourseHeader";
import CourseFilters from "./CourseFilter";
import CourseTable from "./Table";
import CoursePagination from "./Pagination";

import CreateCourseModal from "./CreateCourseModal";
import EditCourseModal from "./EditCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from "../../services/courses.service";

import {getTeachers} from "../../services/teachers.service"
// =====================================================
// COURSE MANAGEMENT
// =====================================================

export default function CourseManagement() {
  // =====================================================
  // DATA
  // =====================================================

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
  const [status, setStatus] = useState("ALL");

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

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  // =====================================================
  // FETCH COURSES
  // =====================================================

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit,
        search,
      };

      // Only send isActive when selected
      if (status !== "ALL") {
        params.isActive = status === "true";
      }

      const response = await getCourses(params);
      setCourses(response?.courses || []);

      const teacherResponse = await getTeachers();
      setTeachers(teacherResponse.teachers);

      setPagination({
        total: response?.pagination?.total || 0,
        totalPages:
          response?.pagination?.totalPages || 1,
      });
    } catch (err) {
      console.error(
        "Failed to fetch courses:",
        err
      );

      setError(
        err.message ||
          "Failed to load courses"
      );

      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    limit,
    search,
    status,
  ]);

  // =====================================================
  // FETCH WHEN FILTER/PAGE CHANGES
  // =====================================================

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const handleClearFilters = () => {
    setSearch("");
    setStatus("ALL");
    setPage(1);
  };

  // =====================================================
  // CREATE COURSE
  // =====================================================

  const handleCreateCourse = async (formData) => {
  try {
    const response = await createCourse(formData);

    console.log("Course created:", response);

    setCreateModalOpen(false);

    await fetchCourses();
  } catch (err) {
    console.error("Create course error:", err);

    // Validation errors
    if (err.message === "Validation failed") {
      console.log("Validation errors:", err.errors);

    }

    throw err;
  }
};

  // =====================================================
  // EDIT COURSE
  // =====================================================

  const handleEditCourse = async (formData) => {
    if (!selectedCourse) return;

    try {
      await updateCourse(
        selectedCourse.id,
        formData
      );

      setEditModalOpen(false);
      setSelectedCourse(null);

      await fetchCourses();
    } catch (err) {
      throw err;
    }
  };

  // =====================================================
  // CHANGE STATUS
  // =====================================================

  // =====================================================
  // DELETE COURSE
  // =====================================================

  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;

    try {
      await deleteCourse(
        selectedCourse.id
      );

      setDeleteModalOpen(false);
      setSelectedCourse(null);

      /*
       * If this was the last course
       * on the current page, go back.
       */

      if (
        courses.length === 1 &&
        page > 1
      ) {
        setPage(
          (currentPage) =>
            currentPage - 1
        );
      } else {
        await fetchCourses();
      }
    } catch (err) {
      setError(
        err.message ||
          "Failed to delete course"
      );
    }
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (course) => {
    if (!course) return;

    console.log(
      "Edit course:",
      course
    );

    setSelectedCourse(course);
    setEditModalOpen(true);
  };

  // =====================================================
  // OPEN DELETE MODAL
  // =====================================================

  const openDeleteModal = (course) => {
    if (!course) return;

    console.log(
      "Delete course:",
      course
    );

    setSelectedCourse(course);
    setDeleteModalOpen(true);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7f9fb]">

      <main>

        {/* =================================================
            HEADER
        ================================================= */}

        <CourseHeader
          onCreateCourse={() =>
            setCreateModalOpen(true)
          }
        />

        {/* =================================================
            FILTERS
        ================================================= */}

        <CourseFilters
          search={search}
          status={status}
          onSearchChange={
            handleSearchChange
          }
          onStatusChange={
            handleStatusChange
          }
          onClear={
            handleClearFilters
          }
        />

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 rounded-lg border border-[#ffdad6] bg-[#ffdad6]/50 px-4 py-3 text-sm text-[#93000a]">
            {error}
          </div>
        )}

        {/* =================================================
            TABLE
        ================================================= */}

        <CourseTable
          courses={courses}
          loading={loading}
          onEdit={openEditModal}
          
          onDelete={
            openDeleteModal
          }
        />

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          pagination.total > 0 && (
            <CoursePagination
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

        {/* =================================================
            CREATE COURSE
        ================================================= */}

        <CreateCourseModal
          open={createModalOpen}
          teachers={teachers}
          onClose={() =>
            setCreateModalOpen(false)
          }
          onSubmit={
            handleCreateCourse
          }
        />

        {/* =================================================
            EDIT COURSE
        ================================================= */}

        {editModalOpen &&
          selectedCourse && (
            <EditCourseModal
              open={editModalOpen}
              course={selectedCourse}
              onClose={() => {
                setEditModalOpen(false);
                setSelectedCourse(null);
              }}
              onSubmit={
                handleEditCourse
              }
            />
          )}

        {/* =================================================
            DELETE COURSE
        ================================================= */}

        {deleteModalOpen &&
          selectedCourse && (
            <DeleteCourseModal
              open={deleteModalOpen}
              course={selectedCourse}
              onClose={() => {
                setDeleteModalOpen(false);
                setSelectedCourse(null);
              }}
              onConfirm={
                handleDeleteCourse
              }
            />
          )}

      </main>

    </div>
  );
}