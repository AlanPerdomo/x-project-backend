export interface UserCreateDto {
    name: string;
    discordId: string;
    username: string;
    email?: string;
    password?: string;
    type?: string;
    
}