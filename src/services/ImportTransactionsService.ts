import Transaction from '../models/Transaction';

import loadCsv from '../utils/CSVFile';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  csvFilePath: string;
}

interface Response {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute({ csvFilePath }: Request): Promise<Response[]> {
    const data = await loadCsv(csvFilePath);
    const createTransactionService = new CreateTransactionService();

    const transactions: Response[] = [];

    data.forEach(line => {
      transactions.push({
        title: line[0],
        type: line[1] as 'income' | 'outcome',
        value: Number(line[2]),
        category: line[3],
      });
    });

    transactions.map(transaction =>
      createTransactionService.execute(transaction),
    );

    return transactions;
  }
}

export default ImportTransactionsService;
