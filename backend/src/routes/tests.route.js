const express = require("express");

const router = express.Router();

const testController =
  require("../controllers/tests.controller");

const authenticate =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorized.middleware");

const validate =
  require("../middlewares/validator.middleware");

const {
  testIdParamSchema,
  createTestSchema,
  updateTestSchema,
  testQuerySchema,
} = require("../validators/tests.validator");

// =====================================================
// TEST ROUTES
// =====================================================

// All test routes require authentication
router.use(authenticate);


// =====================================================
// GET ALL TESTS
// GET /api/tests
// =====================================================

router.get(
  "/",
  validate(testQuerySchema, "query"),
  testController.getTests
);


// =====================================================
// GET TEST BY ID
// GET /api/tests/:id
// =====================================================

router.get(
  "/:id",
  validate(
    testIdParamSchema,
    "params"
  ),
  testController.getTest
);


// =====================================================
// CREATE TEST
// POST /api/tests
// =====================================================

router.post(
  "/",
  authorize("ADMIN", "TEACHER"),
  validate(createTestSchema),
  testController.createTest
);


// =====================================================
// UPDATE TEST
// PATCH /api/tests/:id
// =====================================================

router.patch(
  "/:id",
  authorize("ADMIN", "TEACHER"),
  validate(
    testIdParamSchema,
    "params"
  ),
  validate(updateTestSchema),
  testController.updateTest
);


// =====================================================
// DELETE TEST
// DELETE /api/tests/:id
// =====================================================

router.delete(
  "/:id",
  authorize("ADMIN", "TEACHER"),
  validate(
    testIdParamSchema,
    "params"
  ),
  testController.deleteTest
);


module.exports = router;