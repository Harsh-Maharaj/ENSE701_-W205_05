"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Replace with your actual User model
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        // Hash password and create user logic here
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({ username, email, password: hashedPassword, role });
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        // Cast error as Error to access the message property
        res.status(500).json({ message: 'Signup failed', error: error.message });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // User authentication logic here
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        // Cast error as Error to access the message property
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});
exports.login = login;
