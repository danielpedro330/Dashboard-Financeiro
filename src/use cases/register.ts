import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user-repository";
import { hash } from "bcryptjs";
import { EmailAlreadyExists } from "./error/email-already-exists";

interface UserUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface UserUseCaseReply {
    user: User
}

export class UserUseCase {
    constructor( private _userRepository: UserRepository) {}

    async execute({
        name,
        email,
        password,
    }: UserUseCaseRequest): Promise<UserUseCaseReply> {
        const userWithTheSomeEmail = await this._userRepository.findByEmail(email)
        if(userWithTheSomeEmail) {
            throw new EmailAlreadyExists()
        }

        const password_hash = await hash(password, 6)

        const user = await this._userRepository.create({
            name,
            email,
            password
        })

        return {
            user,
        }
    }
}