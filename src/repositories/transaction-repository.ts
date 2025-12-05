import { Prisma, Transaction } from "@prisma/client";

export interface TransactionRepository {
    findById(id: string): Promise<Transaction | null>
    findByMany(userId: string, page: number): Promise<Transaction[]>
    create(data: Prisma.TransactionCreateInput): Promise<Transaction>
}