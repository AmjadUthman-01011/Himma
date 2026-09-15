
"use client";

import { useCallback, useEffect, useState } from "react";

import StudentHeader from "./StudentHeader";
import StudentFilters from "./StudentFilter";
import StudentTable from "./Table";
import StudentPagination from "./Pagination";

import CreateStudentModal from "./CreateStudentModal";
import EditStudentModal from "./EditStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";

import {
  getStudents,
  createStudent,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
} from "../../services/students.service";

// =====================================================
// STUDENT MANAGEMENT
// =====================================================

export default function StudentManagement() {
  // =====================================================
  // DATA
  // =====================================================

  const [students, setStudents] = useState([]);

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

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  // =====================================================
  // FETCH STUDENTS
  // =====================================================

const fetchStudents = useCallback(async () => {
  try {
    setLoading(true);
    setError("");

    const params = {
      page,
      limit,
      search,
    };

    // Only send isActive if it is actually selected
    if (status !== "ALL") {
      params.isActive = status === "true";
    }

    const response = await getStudents(params);

    setStudents(response.students)

    const total =
      response?.pagination?.total 

    const totalPages =
      response?.pagination?.totalPages

    setPagination({
      total,
      totalPages,
    });
  } catch (err) {
    console.error(
      "Failed to fetch students:",
      err
    );

    setError(
      err.message ||
        "Failed to load students"
    );

    setStudents([]);
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
  // FETCH ON FILTER/PAGE CHANGE
  // =====================================================

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

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
  // CREATE STUDENT
  // =====================================================

  const handleCreateStudent = async (formData) => {
    await createStudent(formData);

    setCreateModalOpen(false);

    await fetchStudents();
  };

  // =====================================================
  // EDIT STUDENT
  // =====================================================

  // ==========================================
// EDIT
// ==========================================

const handleEditStudent = async (formData) => {
  if (!selectedStudent) return;

  try {
    // selectedStudent is the USER
    await updateStudent(
      selectedStudent.id,
      formData
    );

    setEditModalOpen(false);
    setSelectedStudent(null);

    await fetchStudents();
  } catch (err) {
    setError(
      err.message || "Failed to update student"
    );
  }
};

  // =====================================================
  // CHANGE ROLE
  // =====================================================

  // =====================================================
  // CHANGE STATUS
  // =====================================================

  const handleToggleStatus = async (user) => {
  if (!user) return;

  try {
    await updateStudentStatus(
      user.id,
      {
        isActive: !user.isActive,
      }
    );

    await fetchStudents();
  } catch (err) {
    setError(
      err.message ||
        "Failed to update student status"
    );
  }
};

  // =====================================================
  // DELETE STUDENT
  // =====================================================

  const handleDeleteStudent = async () => {
  if (!selectedStudent) return;

  try {
    await deleteStudent(selectedStudent.id);

    setDeleteModalOpen(false);
    setSelectedStudent(null);

    if (students.length === 1 && page > 1) {
      setPage((currentPage) => currentPage - 1);
    } else {
      await fetchStudents();
    }
  } catch (err) {
    setError(
      err.message || "Failed to delete student"
    );
  }
};

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setEditModalOpen(true);
  };

  // =====================================================
  // OPEN DELETE MODAL
  // =====================================================

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
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

        <StudentHeader
          onCreateStudent={() =>
            setCreateModalOpen(true)
          }
        />

        {/* =================================================
            FILTERS
        ================================================= */}

        <StudentFilters
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

        <StudentTable
          students={students}
          loading={loading}
          onEdit={openEditModal}
          onToggleStatus={
            handleToggleStatus
          }
          onDelete={
            openDeleteModal
          }
        />

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          pagination.total > 0 && (
            <StudentPagination
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
            CREATE STUDENT
        ================================================= */}

        <CreateStudentModal
          open={createModalOpen}
          onClose={() =>
            setCreateModalOpen(false)
          }
          onSubmit={
            handleCreateStudent
          }
        />

        {/* =================================================
            EDIT STUDENT
        ================================================= */}

        {editModalOpen &&
          selectedStudent && (
            <EditStudentModal
              open={editModalOpen}
              user={selectedStudent}
              onClose={() => {
                setEditModalOpen(false);
                setSelectedStudent(null);
              }}
              onSubmit={
                handleEditStudent
              }
            />
          )}

        {/* =================================================
            CHANGE ROLE
        ================================================= */}

        {/* =================================================
            DELETE STUDENT
        ================================================= */}

        {deleteModalOpen &&
          selectedStudent && (
            <DeleteStudentModal
              open={deleteModalOpen}
              user={selectedStudent}
              onClose={() => {
                setDeleteModalOpen(false);
                setSelectedStudent(null);
              }}
              onConfirm={
                handleDeleteStudent
              }
            />
          )}
      </main>
    </div>
  );
}

