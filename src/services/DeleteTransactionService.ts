import { getRepository } from 'typeorm';
import { validate } from 'uuid';

import Transaction from '../models/Transaction';

import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    if (!validate(id)) {
      throw new AppError('Invalid UUID');
    }

    const findTransaction = await transactionsRepository.findOne(id);

    if (!findTransaction) {
      throw new AppError('Transaction doest not found');
    }

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
