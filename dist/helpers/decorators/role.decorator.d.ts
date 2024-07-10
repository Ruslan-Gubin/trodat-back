import { UserRole } from '../../modules/users/enums/user-role.enum';
export declare const ROLES_KEY = "role";
export declare const Role: (...role: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
