import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const validTransactionType = type === 'income' || type === 'outcome';

    if (!validTransactionType) {
      throw Error('Transaction type is incorrect');
    }

    const haveMoneyToBuy = (): boolean | undefined => {
      if (type === 'outcome') {
        const balance = this.transactionsRepository.getBalance();
        return balance.total - value > 0;
      }
      return true;
    };

    if (!haveMoneyToBuy()) {
      throw Error('You are trying to use more money than you have');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
