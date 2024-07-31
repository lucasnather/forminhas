import { UserRepository } from "../repository/user/UserRepository.js"
import { AuthenticateUserService } from "../service/user/AuthenticateUserService.js"
import { Hash } from "../utils/Hash.js"

export function makeAuthenticateUser() {
    const userRepository = new UserRepository()
    const hash = new Hash()
    const authenticateUserService = new AuthenticateUserService(userRepository, hash)

    return authenticateUserService
}