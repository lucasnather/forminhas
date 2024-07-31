import { Role, User } from "@prisma/client";
import { UserInterface } from "../../interface/UserInterface.js";
import { Hash } from "../../utils/Hash.js";
import { UserAlreadyExistsError } from "../../error/UserAlreadyExistsError.js";

type CreateUserRequest = {
    email: string
    password: string
    username: string
    role: Role | undefined
} 

type CreateUserResponse = {
    user: User
}

export class CreateUserService {

    constructor(
        private userInterface: UserInterface,
        private hash: Hash
    ) {}

    async execute({ email, password, role, username }: CreateUserRequest): Promise<CreateUserResponse> {
        const isUserExistWithUsername = await this.userInterface.findByUsername(username)

        if(isUserExistWithUsername) throw new UserAlreadyExistsError()

        const isUserExistWithEmail = await this.userInterface.findByEmail(email)

        if(isUserExistWithEmail) throw new UserAlreadyExistsError()

        const hashPassword = await this.hash.hashPassword(password)

        const user = await this.userInterface.create({
            email,
            password: hashPassword,
            username,
            role
        })

        return {
            user
        }
    }
}