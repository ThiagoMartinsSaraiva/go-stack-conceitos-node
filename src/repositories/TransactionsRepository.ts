import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    let income = 0;
    let outcome = 0;

    incomeTransactions.map(transaction => {
      income += transaction.value;
    });

    outcomeTransactions.map(transaction => {
      outcome += transaction.value;
    });

    const total = income - outcome;

    this.balance = { income, outcome, total };
    return this.balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
