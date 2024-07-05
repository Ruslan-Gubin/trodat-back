"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const users_service_1 = require("../modules/users/users.service");
const configs_1 = require("../modules/config/configs");
const minio_client_service_1 = require("../modules/minio-client/minio-client.service");
async function run() {
    const command = process.argv[2];
    const logger = new common_1.Logger('RunCommand');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(users_service_1.UsersService);
    const minioClient = app.get(minio_client_service_1.MinioClientService);
    switch (command) {
        case 'init':
            const adminProps = app.get(configs_1.SuperAdminConfig);
            await userService.create({
                email: adminProps.email,
                password: adminProps.password,
                role: adminProps.role,
            });
            await minioClient.createBucket();
            logger.log('Command init was run');
            await app.close();
            return;
        default:
            logger.error('Command not found');
            await app.close();
    }
}
run();
//# sourceMappingURL=index.js.map