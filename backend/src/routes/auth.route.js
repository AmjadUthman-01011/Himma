const express = require("express");

const authController = require("../controllers/auth.controler");
const validator = require("../middlewares/validator.middleware");
const {loginSchema, refreshTokenSchema} = require("../validators/auth.validator");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", validator(loginSchema, 'body'),authController.login);
router.get("/me", authenticate,authController.getMe);
router.post("/refresh",authController.refresh);
router.get("/logout", authenticate,authController.logout);


module.exports = router;