import { Prisma, User } from "@prisma/client";

export interface UserInterface {
    create(user: Prisma.UserCreateInput): Promise<User>
    findByUsername(username: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
}