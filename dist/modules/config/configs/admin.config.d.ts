import { ConfigService } from '../config.service';
import { User } from 'src/modules/users/schemas/user.schema';
export declare class SuperAdminConfig {
    private readonly email;
    private readonly password;
    private role;
    constructor(configService: ConfigService);
    createAdminOptions(): Partial<User>;
}
