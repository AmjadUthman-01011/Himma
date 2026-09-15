const userService = require("../services/users.service");

const getUsers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      isActive,
    } = req.query;

    const result = await userService.getAllUsers({
      page: Number(page),
      limit: Number(limit),
      search,
      role,
      isActive:
        isActive === undefined
          ? undefined
          : isActive === "true",
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(
      req.body
    );
    //return res.json(user)

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(
      req.params.id
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const user = await userService.updateUserStatus(
      req.params.id,
      req.body.isActive
    );

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const result =
      await userService.updateUserPassword(
        req.params.id,
        req.body.password
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await userService.updateUserRole(id, role);

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        student: user.student,
        teacher: user.teacher,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateStatus,
  updatePassword,
  updateUserRole,
};