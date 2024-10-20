import { Prisma, Role, User } from "@prisma/client";

export type CreateUSerDto = {
    email: string
    username: string
    role: string
}

export type FindUserDto = {
    id: string
    email: string
    username: string
    role: string
}

export interface UserInterface {
    create(user: Prisma.UserCreateInput): Promise<CreateUSerDto>
    findByUsername(username: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<FindUserDto | null>
}