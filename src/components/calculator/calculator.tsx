import type {AccountState, AccountOrder} from 'pages/accountSheet';
import type {IncomeAccount, ExpenseAccount} from 'models/account';
import type {Component} from 'solid-js';

import {convertNumToNormalisedAmount, convertNormalisedAmountToNum} from 'models/account';
import { createSignal, Show } from 'solid-js';
import { Timespan } from 'utils/time';
import {toCurrency} from 'utils/money';

const Calculator: Component<{accounts: any}> = ({accounts}) => {
	const [timespan, setTimespan] = createSignal<Timespan>(Timespan.Week);

	const accumulateNormalisedAccountAmount = (sum: number, accountState: AccountState) => {
		if (accountState.disabled) return sum;

		const {account} = accountState;
		const normalisedAmount = convertNumToNormalisedAmount(account.amount, account.timespan);
		return sum + normalisedAmount;
	}

	const totalIncomeAmount = () => timespan() * accounts.Income.reduce(accumulateNormalisedAccountAmount, 0);

	const totalExpenseAmount = () => timespan() * accounts.Expense.reduce(accumulateNormalisedAccountAmount, 0);

	const totalNetAmount = () =>  totalIncomeAmount() - totalExpenseAmount();

	const totalNetPercent = () => totalExpenseAmount() / totalIncomeAmount() * 100;

	return (
		<div>
			<select onchange={(e) => setTimespan(e.target.value)}>
				<option value={Timespan.Week}>Week</option>
				<option value={Timespan.Month}>Month</option>
				<option value={Timespan.Quarter}>Quarter</option>
				<option value={Timespan.Year}>Year</option>
			</select>
			<h2>Total Income: {toCurrency(totalIncomeAmount())}</h2>
			<h2>Total Expense: {toCurrency(totalExpenseAmount())}</h2>
			<h1>Net: {toCurrency(totalNetAmount())}</h1>
			<Show when={totalIncomeAmount() > 0}>
				<h2>({Math.round(totalNetPercent() * 10) / 10}%)</h2>
			</Show>
		</div>
	);
}

export default Calculator;
