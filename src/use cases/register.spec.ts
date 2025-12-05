import { InMemoryUserRepository } from "@/repositories/in-Memory/user-in-memory-repository";
import { describe, expect, it } from "vitest";
import { UserUseCase } from "./register";
import { EmailAlreadyExists } from "./error/email-already-exists";

describe("Transaction Use Case", () => {
    it("Should be able create transaction", async () => {
        const userRepository = new InMemoryUserRepository()
        const sut = new UserUseCase(userRepository)

        const {user} = await sut.execute({
            name: 'Daniel',
            email: 'daniel@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("Should not be able create a user with the same email address.", async () => {
        const UserRepository = new InMemoryUserRepository()
        const sut = new UserUseCase(UserRepository)

        await UserRepository.create({
            name: 'Daniel Joe',
            email: 'daniel@gmail.com',
            password: '123456'
        })

        expect(async () => {
            await sut.execute({
                name: 'Daniel',
                email: 'daniel@gmail.com',
                password: '123456'
        })
        }).rejects.toBeInstanceOf(EmailAlreadyExists)
    })
})