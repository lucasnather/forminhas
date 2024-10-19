import { UserRepository } from "../repository/user/UserRepository.js";
import { FindUserByIdService } from "../service/user/FindUserByIdService.js";

export function makeFindUserById() {

    const userRepository = new UserRepository()
    const findUserByIdService = new FindUserByIdService(userRepository)

    return findUserByIdService
}