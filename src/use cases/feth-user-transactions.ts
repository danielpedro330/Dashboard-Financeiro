import { TransactionRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";

interface FetchUserTransactionRequest {
    userId: string,
    page: number  
}

interface FetchUserTransactionReply {
    transaction: Transaction[]
}

export class FetchUserTransaction {
    constructor (private _transactionRepository: TransactionRepository) {}

    async execute({
        userId,
        page
    }: FetchUserTransactionRequest): Promise<FetchUserTransactionReply> {
        const transaction = await this._transactionRepository.findByMany(userId, page)

        return {
            transaction,
        }
    }
}