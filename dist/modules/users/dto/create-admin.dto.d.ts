import { UserRole } from '../enums';
export declare class CreateAdminDto {
    email: string;
    password: string;
    full_name: string;
    phone_number: string;
    role?: UserRole;
}
