import { InMemoryTransactionRepository } from "@/repositories/in-Memory/transaction-in-memory-repository";
import { describe, expect, it } from "vitest";
import { Category, TransactionType } from "@prisma/client";
import { FetchUserTransaction } from "./feth-user-transactions";

describe("Fetch User Transactions Use Case", () => {
    it("Should be able to fetch user transactions", async () => {
        const transactionRepository = new InMemoryTransactionRepository()
        
        const sut = new FetchUserTransaction(transactionRepository)

        await transactionRepository.create({
            title: 'Depósito',
            amount: 1000,
            category: Category.OTHERS,
            type: TransactionType.INCOME,
            user: { connect: { id: '1' } },
            createdAt: new Date(`2025-01-22`)
        })

        await transactionRepository.create({
            title: 'Depósito',
            amount: 1500,
            category: Category.OTHERS,
            type: TransactionType.INCOME,
            user: { connect: { id: '1' } },
            createdAt: new Date(`2025-01-22`)
        })

        const {transaction} = await sut.execute({
            userId: '1',
            page: 1
        })

        expect(transaction).toHaveLength(2)
        expect(transaction).toEqual([
            expect.objectContaining({ title: 'Depósito'}),
            expect.objectContaining({ title: 'Depósito'}),
        ])
        
    })

    it("Should be able to fetch paginated transactions", async () => {
        const transactionRepository = new InMemoryTransactionRepository()
        
        const sut = new FetchUserTransaction(transactionRepository)

        for( let i = 1; i <= 22; i++) {
            await transactionRepository.create({
                title: `Depósito${i}`,
                amount: 1000,
                category: Category.OTHERS,
                type: TransactionType.INCOME,
                user: { connect: { id: '1' } },
                createdAt: new Date(`2025-01-${i}`)
        })
        }

        const {transaction} = await sut.execute({
            userId: '1',
            page: 2
        })

        expect(transaction).toHaveLength(2)
        expect(transaction).toEqual([
            expect.objectContaining({ title: 'Depósito21'}),
            expect.objectContaining({ title: 'Depósito22'}),
        ])
    })
})