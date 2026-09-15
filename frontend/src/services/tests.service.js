import api from "../lib/api";

// =====================================================
// GET ALL TESTS
// GET /api/tests
// AUTHENTICATED USERS
// =====================================================

export const getTests = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();

  return api(
    `/tests${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    }
  );
};


// =====================================================
// GET TEST BY ID
// GET /api/tests/:id
// AUTHENTICATED USERS
// =====================================================

export const getTest = async (testId) => {
  return api(`/tests/${testId}`, {
    method: "GET",
  });
};


// =====================================================
// CREATE TEST
// POST /api/tests
// ADMIN / TEACHER
// =====================================================

export const createTest = async (testData) => {
  return api("/tests", {
    method: "POST",
    body: JSON.stringify(testData),
  });
};


// =====================================================
// UPDATE TEST
// PATCH /api/tests/:id
// ADMIN / TEACHER
// =====================================================

export const updateTest = async (testId, testData) => {
  return api(`/tests/${testId}`, {
    method: "PATCH",
    body: JSON.stringify(testData),
  });
};


// =====================================================
// DELETE TEST
// DELETE /api/tests/:id
// ADMIN / TEACHER
// =====================================================

export const deleteTest = async (testId) => {
  return api(`/tests/${testId}`, {
    method: "DELETE",
  });
};