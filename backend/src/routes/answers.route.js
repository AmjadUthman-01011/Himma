const express = require("express");

const router = express.Router();

const answerController =
  require("../controllers/answers.controller");

const authenticate =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorized.middleware");

const validate =
  require("../middlewares/validator.middleware");

const {
  answerIdParamSchema,
  createAnswerSchema,
  updateAnswerSchema,
} = require("../validators/answers.validator");

// =====================================================
// AUTHENTICATION
// =====================================================

router.use(authenticate);

// =====================================================
// GET ANSWERS BY SUBMISSION
// GET /api/answers/submission/:submissionId
// =====================================================

router.get(
  "/submission/:submissionId",

  authorize(
    "ADMIN",
    "TEACHER",
    "STUDENT"
  ),

  validate(
    answerIdParamSchema,
    "params"
  ),

  answerController.getAnswersBySubmission
);

// =====================================================
// GET ANSWER
// GET /api/answers/:id
// =====================================================

router.get(
  "/:id",

  authorize(
    "ADMIN",
    "TEACHER",
    "STUDENT"
  ),

  validate(
    answerIdParamSchema,
    "params"
  ),

  answerController.getAnswer
);

// =====================================================
// CREATE ANSWER
// POST /api/answers
// =====================================================

router.post(
  "/",

  authorize("STUDENT"),

  validate(createAnswerSchema),

  answerController.createAnswer
);

// =====================================================
// UPDATE ANSWER
// PATCH /api/answers/:id
// =====================================================

router.patch(
  "/:id",

  authorize("STUDENT"),

  validate(
    answerIdParamSchema,
    "params"
  ),

  validate(updateAnswerSchema),

  answerController.updateAnswer
);

// =====================================================
// DELETE ANSWER
// DELETE /api/answers/:id
// =====================================================

router.delete(
  "/:id",

  authorize("STUDENT"),

  validate(
    answerIdParamSchema,
    "params"
  ),

  answerController.deleteAnswer
);

module.exports = router;