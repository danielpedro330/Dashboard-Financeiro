import { Transaction, Prisma } from "@prisma/client";
import { TransactionRepository } from "../transaction-repository";
import { randomUUID } from "node:crypto";

export class InMemoryTransactionRepository implements TransactionRepository {
    public items: Transaction[] = []

    async findById(id: string) {
        const transaction = this.items.find(item => item.id === id)

        return transaction ?? null
    }

    async findByMany(userId: string, page: number) {

        const transaction = this.items.filter(
        (item) => item.userId === userId
        ).slice((page - 1) * 20, page * 20)

        return transaction
    }

    async create(data: Prisma.TransactionCreateInput) {
        const transaction = {
            id: randomUUID(),
            title: data.title,
            amount: data.amount,
            type: data.type,
            category: data.category,
            createdAt: new Date(),
            userId: data.user.connect?.id ?? '',
        }

        this.items.push(transaction)

        return transaction
    }

}