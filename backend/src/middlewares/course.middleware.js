const prisma = require("../config/prisma");

const authorizeCourseTeacher = async (req, res, next) => {
    try {

        // Admin can access any course
        if (req.user.role === "ADMIN") {
            return next();
        }

        // Only teachers can continue
        if (req.user.role !== "TEACHER") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        const courseId = Number(req.params.id);

        if (!Number.isInteger(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID"
            });
        }
        const teacher = await prisma.teacher.findUnique({
            where: {
                userId: req.user.id
            },
            select: {
                id: true
            }
        });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher profile not found"
            });
        }

        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            },
            select: {
                id: true,
                teacherId: true
            }
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.teacherId !== teacher.id) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to this course"
            });
        }

        next();

    } catch (error) {
        next(error);
    }
};

const authorizeCourseAccess = async (req, res, next) => {
    try {
        // ==========================================
        // Validate Course ID
        // ==========================================

        const courseId = Number(req.params.id);

        if (!Number.isInteger(courseId) || courseId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        // ==========================================
        // ADMIN
        // ==========================================

        if (req.user.role === "ADMIN") {
            return next();
        }

        // ==========================================
        // Get Course
        // ==========================================

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                id: true,
                teacherId: true,
            },
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // ==========================================
        // Authenticated User ID
        // ==========================================

        const userId = Number(req.user.id);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid authenticated user",
            });
        }

        // ==========================================
        // TEACHER
        // ==========================================

        if (req.user.role === "TEACHER") {

            const teacher = await prisma.teacher.findUnique({
                where: {
                    userId,
                },
                select: {
                    id: true,
                },
            });

            if (!teacher) {
                return res.status(404).json({
                    success: false,
                    message: "Teacher profile not found",
                });
            }

            // Teacher must own the course
            if (teacher.id !== course.teacherId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not assigned to this course",
                });
            }

            return next();
        }

        // ==========================================
        // STUDENT
        // ==========================================

        if (req.user.role === "STUDENT") {

            const student = await prisma.student.findUnique({
                where: {
                    userId,
                },
                select: {
                    id: true,
                },
            });

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: "Student profile not found",
                });
            }

            const enrollment =
                await prisma.enrollment.findUnique({
                    where: {
                        studentId_courseId: {
                            studentId: student.id,
                            courseId,
                        },
                    },
                    select: {
                        id: true,
                    },
                });

            if (!enrollment) {
                return res.status(403).json({
                    success: false,
                    message: "You are not enrolled in this course",
                });
            }

            return next();
        }

        // ==========================================
        // UNKNOWN ROLE
        // ==========================================

        return res.status(403).json({
            success: false,
            message: "Access denied",
        });

    } catch (error) {
        return next(error);
    }
};

module.exports = {authorizeCourseTeacher, authorizeCourseAccess};