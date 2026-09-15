
"use client";

import { useCallback, useEffect, useState } from "react";

import TeacherHeader from "./TeacherHeader";
import TeacherFilters from "./TeacherFilter";
import TeacherTable from "./Table";
import TeacherPagination from "./Pagination";

import CreateTeacherModal from "./CreateTeacherModal";
import EditTeacherModal from "./EditTeacherModal";
import DeleteTeacherModal from "./DeleteTeacherModal";

import {
  getTeachers,
  createTeacher,
  updateTeacher,
  updateTeacherStatus,
  deleteTeacher,
} from "../../services/teachers.service";


// =====================================================
// teacher MANAGEMENT
// =====================================================

export default function TeacherManagement() {
  // =====================================================
  // DATA
  // =====================================================

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

  const [selectedTeacher, setSelectedTeacher] =
    useState(null);

  // =====================================================
  // FETCH TeacherS
  // =====================================================

const fetchTeachers = useCallback(async () => {
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

    const response = await getTeachers(params);

    console.log("Teachers response:", response);

    setTeachers(response.teachers)

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
      "Failed to fetch teachers:",
      err
    );

    setError(
      err.message ||
        "Failed to load teachers"
    );

    setTeachers([]);
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
    fetchTeachers();
  }, [fetchTeachers]);

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
  // CREATE Teacher
  // =====================================================

  const handleCreateTeacher = async (formData) => {
    await createTeacher(formData);

    setCreateModalOpen(false);

    await fetchTeachers();
  };

  // =====================================================
  // EDIT Teacher
  // =====================================================

  // ==========================================
// EDIT
// ==========================================

const handleEditTeacher = async (formData) => {
  if (!selectedTeacher) return;

  try {
    // selectedTeacher is the USER
    await updateTeacher(
      selectedTeacher.id,
      formData
    );

    setEditModalOpen(false);
    setSelectedTeacher(null);

    await fetchTeachers();
  } catch (err) {
    setError(
      err.message || "Failed to update Teacher"
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
    await updateTeacherStatus(
      user.id,
      {
        isActive: !user.isActive,
      }
    );

    await fetchTeachers();
  } catch (err) {
    setError(
      err.message ||
        "Failed to update Teacher status"
    );
  }
};

  // =====================================================
  // DELETE Teacher
  // =====================================================

  const handleDeleteTeacher = async () => {
  if (!selectedTeacher) return;

  try {
    await deleteTeacher(selectedTeacher.id);

    setDeleteModalOpen(false);
    setSelectedTeacher(null);

    if (teachers.length === 1 && page > 1) {
      setPage((currentPage) => currentPage - 1);
    } else {
      await fetchTeachers();
    }
  } catch (err) {
    setError(
      err.message || "Failed to delete Teacher"
    );
  }
};

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setEditModalOpen(true);
  };

  // =====================================================
  // OPEN DELETE MODAL
  // =====================================================

  const openDeleteModal = (teacher) => {
    setSelectedTeacher(teacher);
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

        <TeacherHeader
          onCreateTeacher={() =>
            setCreateModalOpen(true)
          }
        />

        {/* =================================================
            FILTERS
        ================================================= */}

        <TeacherFilters
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

        <TeacherTable
          teachers={teachers}
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
            <TeacherPagination
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
            CREATE Teacher
        ================================================= */}

        <CreateTeacherModal
          open={createModalOpen}
          onClose={() =>
            setCreateModalOpen(false)
          }
          onSubmit={
            handleCreateTeacher
          }
        />

        {/* =================================================
            EDIT Teacher
        ================================================= */}

        {editModalOpen &&
          selectedTeacher && (
            <EditTeacherModal
              open={editModalOpen}
              user={selectedTeacher}
              onClose={() => {
                setEditModalOpen(false);
                setSelectedTeacher(null);
              }}
              onSubmit={
                handleEditTeacher
              }
            />
          )}

        {/* =================================================
            CHANGE ROLE
        ================================================= */}

        {/* =================================================
            DELETE Teacher
        ================================================= */}

        {deleteModalOpen &&
          selectedTeacher && (
            <DeleteTeacherModal
              open={deleteModalOpen}
              user={selectedTeacher}
              onClose={() => {
                setDeleteModalOpen(false);
                setSelectedTeacher(null);
              }}
              onConfirm={
                handleDeleteTeacher
              }
            />
          )}
      </main>
    </div>
  );
}

