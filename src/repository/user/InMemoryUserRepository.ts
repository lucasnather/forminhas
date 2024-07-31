import { Prisma, User } from "@prisma/client";
import { UserInterface } from "../../interface/UserInterface.js";
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserInterface {

    private users: User[] = []

    async create(user: Prisma.UserCreateInput): Promise<User> {


        const createUser: User = {
            id: randomUUID() ?? user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role ?? 'Boss',
            createdAt: new Date(),
            updatedAt: null
        }

        this.users.push(createUser)

        return createUser
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = this.users.find(user => user.username === username)

        const userNotFound = !user

        if(userNotFound) return null

        return user
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email)

        const userNotFound = !user

        if(userNotFound) return null

        return user
    }

}