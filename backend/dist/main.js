"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const dbUri = process.env.DB_URI;
    const logger = new common_1.ConsoleLogger('Bootstrap');
    try {
        await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });
        logger.log('Database connected successfully');
    }
    catch (err) {
        logger.error('Database connection error:', err.message);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: true, credentials: true });
    const port = process.env.PORT || 8082;
    const server = await app.listen(port);
    logger.log(`Server running on port ${port}`);
    return server;
}
exports.default = bootstrap();
//# sourceMappingURL=main.js.map