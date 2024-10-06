"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// Load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const articleRoutes_js_1 = __importDefault(require("./routes/articleRoutes.js"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const moderationRoutes_js_1 = __importDefault(require("./routes/moderationRoutes.js"));
const searchRoutes_js_1 = __importDefault(require("./routes/searchRoutes.js"));
dotenv_1.default.config(); // Use ES module import for `dotenv`
// Initialize app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Connect to the database
(0, db_js_1.default)();
// Define routes
app.use('/api/auth', authRoutes_js_1.default);
app.use('/api/articles', articleRoutes_js_1.default);
app.use('/api/moderation', moderationRoutes_js_1.default);
app.use('/api/search', searchRoutes_js_1.default);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
dotenv_1.default.config();
(0, db_js_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_js_1.default);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
