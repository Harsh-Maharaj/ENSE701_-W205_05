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
const express_1 = __importDefault(require("express"));
const articleModel_js_1 = __importDefault(require("../models/articleModel.js")); // Import the Mongoose model
const router = express_1.default.Router();
// POST /api/articles - Add a new article
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, authors, source, publication_year, doi, claim, evidence, linked_discussion } = req.body;
    try {
        // Create a new article document
        const article = new articleModel_js_1.default({
            title,
            authors,
            source,
            publication_year,
            doi,
            claim,
            evidence,
            linked_discussion,
        });
        // Save the article to the database
        const savedArticle = yield article.save();
        // Respond with the saved article
        res.status(201).json(savedArticle);
    }
    catch (error) {
        console.error('Error saving article:', error);
        res.status(500).json({ message: 'Server error, unable to save article.' });
    }
}));
// GET /api/articles - Fetch all articles
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield articleModel_js_1.default.find(); // Fetch all articles from MongoDB
        res.json(articles); // Return the articles as JSON
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Server error, unable to fetch articles.' });
    }
}));
exports.default = router;
