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
    common_1.Logger.log(`DB_URI: ${dbUri}`, 'Bootstrap');
    try {
        await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });
        common_1.Logger.log('Database connected successfully');
    }
    catch (err) {
        common_1.Logger.error('Database connection error:', err.message);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: true, credentials: true });
    const port = process.env.PORT || 8082;
    await app.listen(port, () => common_1.Logger.log(`Server running on port ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map