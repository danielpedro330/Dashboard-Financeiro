import { TransactionRepository } from "@/repositories/transaction-repository";
import { Category, Transaction, TransactionType, User } from "@prisma/client";

interface TransactionUseCaseRequest {
  title: string,
  amount: number,
  type: TransactionType,
  category: Category,
  userId: string
}

interface TransactionUseCaseReply {
    transaction: Transaction
}

export class TransactionUseCase {
    constructor( private _transactionRepository: TransactionRepository) {}

    async execute({
        title,
        amount,
        type,
        category,
        userId
    }: TransactionUseCaseRequest): Promise<TransactionUseCaseReply> {

        const finalAmount = type === "EXPENSE" ? -Math.abs(amount) : Math.abs(amount);

        const transaction = await this._transactionRepository.create({
            title,
            amount: finalAmount,
            type,
            category,
            user: { connect: { id: userId } }
        })

        return {
            transaction,
        }
    }
}