require("dotenv").config();
const prisma = require("./src/config/prisma");

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
        await prisma.$connect();

        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();