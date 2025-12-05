import { InMemoryTransactionRepository } from "@/repositories/in-Memory/transaction-in-memory-repository";
import { describe, expect, it } from "vitest";
import { TransactionUseCase } from "./transaction";
import { Category, TransactionType } from "@prisma/client";

describe("Transaction Use Case", () => {
    it("Should be able create transaction", async () => {
        const transactionRepository = new InMemoryTransactionRepository()
        const sut = new TransactionUseCase(transactionRepository)

        const {transaction} = await sut.execute({
            title: 'Depósito',
            amount: 1000,
            category: Category.OTHERS,
            type: TransactionType.INCOME,
            userId: '2'
        })

        expect(transaction.id).toEqual(expect.any(String))
    })
})