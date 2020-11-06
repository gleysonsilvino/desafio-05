import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  // private balance: Balance;

  constructor() {
    this.transactions = [];
    // this.balance = {
    //   income: 0,
    //   outcome: 0,
    //   total: 0,
    // };
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    // return this.balance;
    const balance = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        accumulator.total = accumulator.income - accumulator.outcome;
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid type');
    }

    // if (type === 'income') {
    //   this.balance.income += value;
    // } else if (type === 'outcome') {
    //   this.balance.outcome += value;
    // } else throw Error('Invalid type');

    // this.balance.total = this.balance.income - this.balance.outcome;

    return transaction;
  }
}

export default TransactionsRepository;
