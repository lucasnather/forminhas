import { User } from "@prisma/client";
import { UserInterface } from "../../interface/UserInterface.js";
import { Hash } from "../../utils/Hash.js";
import { InvalidCredentialsError } from "../../error/InvalidCredentialsError.js";

type AuthenticateUserRequest = {
    email: string
    password: string
    username: string
}

type AuthenticateUserResponse = {
    user: User
}

export class AuthenticateUserService {

    constructor(
        private userInterface: UserInterface,
        private hash: Hash
    ) {}

    async execute({ email, password, username }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        const isUserExistWithUsername = await this.userInterface.findByUsername(username)

        if(!isUserExistWithUsername) throw new InvalidCredentialsError()

        const isUserExistWithEmail = await this.userInterface.findByEmail(email)

        if(!isUserExistWithEmail) throw new InvalidCredentialsError()
        
        const isPasswordValid = await this.hash.comparePassword(password, isUserExistWithEmail.password)

        if(!isPasswordValid) throw new InvalidCredentialsError()
        
        return {
            user: isUserExistWithUsername
        }
    }
}