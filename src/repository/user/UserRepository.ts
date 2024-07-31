import { Prisma, User } from "@prisma/client";
import { UserInterface } from "../../interface/UserInterface.js";
import { prisma } from "../../database/prisma.js";


export class UserRepository implements UserInterface {

    async create({ email,password,role,username }: Prisma.UserCreateInput): Promise<User> {
        const users = await prisma.user.create({
            data: {
                email,
                password,
                username,
                role
            }
        })

        return users
    }

    async findByUsername(username: string): Promise<User | null> {
        const users = await prisma.user.findUnique({
            where: {
                username
            }
        })

        const isNotFoundUsers = !users

        if(isNotFoundUsers) return null

        return users
    }

    async findByEmail(email: string): Promise<User | null> {
        const users = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const isNotFoundUsers = !users

        if(isNotFoundUsers) return null

        return users
    }

}