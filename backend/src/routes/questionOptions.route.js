const express = require("express");

const router = express.Router();

const controller =
  require("../controllers/questionOptions.controller");

const authenticate =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorized.middleware");

const validate =
  require("../middlewares/validator.middleware");

const {
  questionOptionIdParamSchema,
  createQuestionOptionSchema,
  updateQuestionOptionSchema,
  questionOptionQuerySchema,
} = require("../validators/questionOptions.validator");

// =====================================================
// AUTHENTICATION
// =====================================================

router.use(authenticate);

// =====================================================
// GET ALL OPTIONS
// GET /api/question-options
// =====================================================

router.get(
  "/",
  validate(
    questionOptionQuerySchema,
    "query"
  ),
  controller.getOptions
);

// =====================================================
// GET OPTION BY ID
// GET /api/question-options/:id
// =====================================================

router.get(
  "/:id",
  validate(
    questionOptionIdParamSchema,
    "params"
  ),
  controller.getOption
);

// =====================================================
// CREATE OPTION
// POST /api/question-options
// =====================================================

router.post(
  "/",
  authorize("TEACHER"),
  validate(
    createQuestionOptionSchema
  ),
  controller.createOption
);

// =====================================================
// UPDATE OPTION
// PATCH /api/question-options/:id
// =====================================================

router.patch(
  "/:id",
  authorize("TEACHER"),
  validate(
    questionOptionIdParamSchema,
    "params"
  ),
  validate(
    updateQuestionOptionSchema
  ),
  controller.updateOption
);

// =====================================================
// DELETE OPTION
// DELETE /api/question-options/:id
// =====================================================

router.delete(
  "/:id",
  authorize("TEACHER"),
  validate(
    questionOptionIdParamSchema,
    "params"
  ),
  controller.deleteOption
);

module.exports = router;