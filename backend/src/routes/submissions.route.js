const express = require("express");

const router = express.Router();

const submissionController =
  require("../controllers/submissions.controller");

const authenticate =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorized.middleware");

const validate =
  require("../middlewares/validator.middleware");

const {
  submissionIdParamSchema,
  createSubmissionSchema,
  updateSubmissionSchema,
  gradeSubmissionSchema,
  submissionQuerySchema,
} = require("../validators/submissions.validator");

// =====================================================
// AUTHENTICATION
// =====================================================

router.use(authenticate);

// =====================================================
// GET ALL SUBMISSIONS
// GET /api/submissions
// =====================================================

router.get(
  "/",
  authorize(
    "ADMIN",
    "TEACHER",
    "STUDENT"
  ),
  validate(
    submissionQuerySchema,
    "query"
  ),
  submissionController.getSubmissions
);

// =====================================================
// GET SUBMISSION BY ID
// GET /api/submissions/:id
// =====================================================

router.get(
  "/:id",
  authorize(
    "ADMIN",
    "TEACHER",
    "STUDENT"
  ),
  validate(
    submissionIdParamSchema,
    "params"
  ),
  submissionController.getSubmission
);

// =====================================================
// CREATE SUBMISSION
// POST /api/submissions
// =====================================================

router.post(
  "/",
  authorize("STUDENT"),
  validate(createSubmissionSchema),
  submissionController.createSubmission
);

// =====================================================
// UPDATE SUBMISSION
// PATCH /api/submissions/:id
// =====================================================

router.patch(
  "/:id",
  authorize("STUDENT"),
  validate(
    submissionIdParamSchema,
    "params"
  ),
  validate(updateSubmissionSchema),
  submissionController.updateSubmission
);

// =====================================================
// SUBMIT
// PATCH /api/submissions/:id/submit
// =====================================================

router.patch(
  "/:id/submit",
  authorize("STUDENT"),
  validate(
    submissionIdParamSchema,
    "params"
  ),
  submissionController.submitSubmission
);

// =====================================================
// GRADE
// PATCH /api/submissions/:id/grade
// =====================================================

router.patch(
  "/:id/grade",
  authorize("ADMIN", "TEACHER"),
  validate(
    submissionIdParamSchema,
    "params"
  ),
  validate(gradeSubmissionSchema),
  submissionController.gradeSubmission
);

// =====================================================
// DELETE
// DELETE /api/submissions/:id
// =====================================================

router.delete(
  "/:id",
  authorize(
    "ADMIN",
    "TEACHER",
    "STUDENT"
  ),
  validate(
    submissionIdParamSchema,
    "params"
  ),
  submissionController.deleteSubmission
);

module.exports = router;