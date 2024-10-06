"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Use a wrapper function to handle async errors properly
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// Use asyncHandler for both signup and login
router.post('/signup', asyncHandler(authController_1.signup));
router.post('/login', asyncHandler(authController_1.login));
exports.default = router;
