import { UserRepository } from "../repository/user/UserRepository.js"
import { CreateUserService } from "../service/user/CreateUserService.js"
import { Hash } from "../utils/Hash.js"

export function makeCreateUser() {
    const userRepository = new UserRepository()
    const hash = new Hash()
    const createUserService = new CreateUserService(userRepository, hash)

    return createUserService
}