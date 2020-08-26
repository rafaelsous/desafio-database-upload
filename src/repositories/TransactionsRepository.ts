import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionsRepository = getRepository(Transaction);

    const transactions = await transactionsRepository.find();

    const incomeTransactions = transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomeTransactions = transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const incomeTotal = incomeTransactions.reduce(
      (total, currentValue) => total + currentValue.value,
      0,
    );

    const outcomeTotal = outcomeTransactions.reduce(
      (total, currentValue) => total + currentValue.value,
      0,
    );

    return {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };
  }
}

export default TransactionsRepository;
