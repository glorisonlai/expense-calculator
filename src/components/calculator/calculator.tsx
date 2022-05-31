import type {AccountState} from 'pages/accountSheet';
import type {Component} from 'solid-js';

import {convertNumToNormalisedAmount, convertNormalisedAmountToNum} from 'models/account';
import { createSignal } from 'solid-js';
import { Timespan } from 'utils/time';

const Calculator: Component<{income: AccountState[], expenses: AccountState[]}> = ({income, expenses}) => {
	const [timespan, setTimespan] = createSignal<Timespan>(Timespan.Month);

	const accumulateAccountAmount = (sum: number, accountState: AccountState) => {
		if (accountState.disabled) return sum;

		const {account} = accountState;
		const normalisedAmount = convertNumToNormalisedAmount(account.amount, account.timespan);
		return sum + convertNormalisedAmountToNum(normalisedAmount, timespan());
	}

	const totalIncomeAmount = () => timespan() * income.reduce(accumulateAccountAmount, 0);

	const totalExpenseAmount = () => timespan() * expenses.reduce(accumulateAccountAmount, 0);

	const totalNetAmount = totalIncomeAmount() - totalExpenseAmount();

	const totalNetPercent = totalExpenseAmount() / totalIncomeAmount() * 100;

    return (
        <div>
			<select >
				<option value={Timespan.Week}>Week</option>
				<option value={Timespan.Month}>Month</option>
				<option value={Timespan.Quarter}>Quarter</option>
				<option value={Timespan.Year}>Year</option>
			</select>
			<h2>Total Income: {totalIncomeAmount()}</h2>
			<h2>Total Expense: {totalExpenseAmount()}</h2>
			<h1>Net: {totalNetAmount}</h1>
			<h2>({totalNetPercent}%)</h2>
        </div>
   )
}

export default Calculator;
