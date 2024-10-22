import { User } from "src/users/user.entity";

export interface PerolaCreateDto {
    perola: string;
    date?: string;
    userId?: string;
    guildId?: string;
    channelId?: string;
    username?: string;
    name?: string;
    
}
