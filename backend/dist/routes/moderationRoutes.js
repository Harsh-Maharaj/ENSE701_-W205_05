"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moderationController_js_1 = require("../controllers/moderationController.js");
const router = express_1.default.Router();
router.post('/approve', moderationController_js_1.approveArticle);
exports.default = router;
