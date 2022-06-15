import type {Timespan} from 'utils/time';

type NormalisedAmount = number;

export enum AccountType {
    Income = "Income",
  	Expense = "Expense",
}

export interface Account {
    readonly type: AccountType;
    readonly amount: NormalisedAmount;
    readonly title: string;
  	readonly timespan: Timespan;
    readonly description?: string;
}

export interface IncomeAccount extends Account {
	type: AccountType.Income
}

export interface ExpenseAccount extends Account {
	type: AccountType.Expense
}

export const createAccount = (type: AccountType, title: string, timespan: Timespan, description: string, amount: NormalisedAmount): Account => (
    {
        type,
        amount,
        title,
    		timespan,
        description
    }
)

export const convertNumToNormalisedAmount = (num: number, span: Timespan): NormalisedAmount => num / span

export const convertNormalisedAmountToNum = (amount: NormalisedAmount, span: Timespan): number => amount * span

