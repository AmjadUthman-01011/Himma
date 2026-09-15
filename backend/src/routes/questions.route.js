const express = require("express");

const router = express.Router();

const questionController =
  require("../controllers/questions.controller");

const authenticate =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorized.middleware");

const validate =
  require("../middlewares/validator.middleware");

const {
  questionIdParamSchema,
  createQuestionSchema,
  updateQuestionSchema,
  questionQuerySchema,
} = require("../validators/questions.validator");

// =====================================================
// QUESTION ROUTES
// =====================================================

// Authentication required
router.use(authenticate);

// =====================================================
// GET ALL QUESTIONS
// GET /api/questions
// =====================================================

router.get(
  "/",
  validate(
    questionQuerySchema,
    "query"
  ),
  questionController.getQuestions
);

// =====================================================
// GET QUESTION BY ID
// GET /api/questions/:id
// =====================================================

router.get(
  "/:id",
  validate(
    questionIdParamSchema,
    "params"
  ),
  questionController.getQuestion
);

// =====================================================
// CREATE QUESTION
// POST /api/questions
// =====================================================

router.post(
  "/",
  authorize("TEACHER"),
  validate(createQuestionSchema),
  questionController.createQuestion
);

// =====================================================
// UPDATE QUESTION
// PATCH /api/questions/:id
// =====================================================

router.patch(
  "/:id",
  authorize("TEACHER"),
  validate(
    questionIdParamSchema,
    "params"
  ),
  validate(updateQuestionSchema),
  questionController.updateQuestion
);

// =====================================================
// DELETE QUESTION
// DELETE /api/questions/:id
// =====================================================

router.delete(
  "/:id",
  authorize("TEACHER"),
  validate(
    questionIdParamSchema,
    "params"
  ),
  questionController.deleteQuestion
);

module.exports = router;