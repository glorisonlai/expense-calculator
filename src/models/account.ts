type NormalisedAmount = number;

export type Account = {
    type: AccountType,
    amount: NormalisedAmount,
    title: string,
    description?: string,
}

type StandardTime = number;

export enum AccountType {
    Income,
    Expense
}

enum Timespan {
    Week: 1/4,
    Month: 1,
    Quarter: 3,
    Year: 52,
}

export const createAccount = (type: AccountType, title: string, description: string, amount: NormalisedAccount): Account => (
    {
        type,
        amount,
        title,
        description
    }
)


const ConvertTimeToStandardTime = (val: number, span: Timespan): StandardTime => val * span

const ConvertStandardTimeToTime = (val: StandardTime, span: Timespan): number => val / span


