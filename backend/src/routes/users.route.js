const express = require("express");

const router = express.Router();

const userController = require("../controllers/users.controller");

const authenticate = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorized.middleware");

const validate = require("../middlewares/validator.middleware");

const {
  createUserSchema,
  updateUserSchema,
  updateStatusSchema,
  updatePasswordSchema,
  updateRoleSchema,
  userIdParamSchema,
} = require("../validators/users.validator");


// =====================================================
// USER MANAGEMENT
// =====================================================

router.use(authenticate);
router.use(authorize("ADMIN"));


// GET /api/users
router.get(
  "/",
  userController.getUsers
);


// GET /api/users/:id
router.get(
  "/:id",
  validate(userIdParamSchema, "params"),
  userController.getUser
);


// POST /api/users
router.post(
  "/",
  validate(createUserSchema),
  userController.createUser
);


// PATCH /api/users/:id
router.patch(
  "/:id",
  validate(userIdParamSchema, "params"),
  validate(updateUserSchema),
  userController.updateUser
);


// DELETE /api/users/:id
router.delete(
  "/:id",
  validate(userIdParamSchema, "params"),
  userController.deleteUser
);


// PATCH /api/users/:id/status
router.patch(
  "/:id/status",
  validate(userIdParamSchema, "params"),
  validate(updateStatusSchema),
  userController.updateStatus
);


// PATCH /api/users/:id/password
router.patch(
  "/:id/password",
  validate(userIdParamSchema, "params"),
  validate(updatePasswordSchema),
  userController.updatePassword
);


// PATCH /api/users/:id/role
router.patch(
  "/:id/role",
  validate(userIdParamSchema, "params"),
  validate(updateRoleSchema),
  userController.updateUserRole
);


module.exports = router;