"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const configs_1 = require("./modules/config/configs");
const cors_1 = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cors_1.default)({
        credentials: true,
        origin: '*'
    }));
    const appConfig = app.get(configs_1.AppConfig);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.setGlobalPrefix('api');
    await app.listen(appConfig.port, () => console.log('Server was started on port: ' + appConfig.port));
}
bootstrap();
//# sourceMappingURL=main.js.map