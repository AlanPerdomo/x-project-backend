import { User } from "src/users/user.entity";

export interface PerolaCreateDto {
    perola: string;
    date?: string;
    user?: User;
}
