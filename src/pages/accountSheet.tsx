import type {IncomeAccount, ExpenseAccount} from 'models/account';

import {Timespan} from 'utils/time'
import Calculator from 'components/calculator/calculator';
import AccountTileList from 'components/accountTileList/accountTileList';
import {createStore} from 'solid-js/store';
import {AccountType} from 'models/account';

export type AccountState<T = IncomeAccount | ExpenseAccount> = {
	account: T,
	disabled: boolean,
}

export type AccountOrder = {
	[AccountType.Income]: AccountState<IncomeAccount>[],
	[AccountType.Expense]: AccountState<ExpenseAccount>[],
}

const AccountSheet = () => {
	const rent: ExpenseAccount = {
		type: AccountType.Expense,
		amount: 470,
		title: "Rent",
		timespan: Timespan.Week,
	}

	const rentAcc = {
		account: rent,
		disabled: false,
	}

	const income: IncomeAccount = {
		type: AccountType.Income,
		amount: 72000,
		title: "Income",
		timespan: Timespan.Year,
	}

	const incomeAcc = {
		account: income,
		disabled: false,
	}

	const food: ExpenseAccount = {
		type: AccountType.Expense,
		amount: 50.1,
		title: "Food",
		timespan: Timespan.Week,
	}

	const foodAcc = {
		account: food,
		disabled: false,
	}

	const electricityBill: ExpenseAccount = {
		type: AccountType.Expense,
		amount: 1273,
		title: "Electricity Bill",
		timespan: Timespan.Year,
	}

	const elecAcc = {
		account: electricityBill,
		disabled: false,
	}

	const gasBill: ExpenseAccount = {
		type: AccountType.Expense,
		amount: 230,
		title: "Gas Bill",
		timespan: Timespan.Year,
	}

	const gasAcc = {
		account: gasBill,
		disabled: false,
	}

	const waterBill: ExpenseAccount = {
		type: AccountType.Expense,
		amount: 1008,
		title: "Water Bill",
		timespan: Timespan.Year,
	}

	const waterAcc = {
		account: waterBill,
		disabled: false,
	}

	const nbnBill: ExpenseAccount = {
		type: AccountType.Expense,
		amount: 70,
		title: "NBN Bill",
		timespan: Timespan.Month,
	}

	const nbnAcc = {
		account: nbnBill,
		disabled: false,
	}

	const bills = [elecAcc, gasAcc, waterAcc, nbnAcc]

	const [accountsOrder, setAccountsOrder] = createStore<AccountOrder>({
		[AccountType.Income]: [incomeAcc],
		[AccountType.Expense]: [rentAcc, foodAcc],
	})

	const editAccountsOrder = (key: AccountType) => (index: number) => (account: any) => {
		setAccountsOrder(
			AccountType.Income,
			index,
			account,
		);
	}


    return (
        <div>
			<button onclick={() => {console.log(accountsOrder); setAccountsOrder(AccountType.Expense, [...accountsOrder.Expense, {account: {type: AccountType.Expense, amount: 100, timespan: Timespan.Month, title: "blah"}, disabled: false}])}}/>
			<Calculator accounts={accountsOrder} />
			<h1>Income</h1>
			<hr/>
			<AccountTileList accountStates={() => accountsOrder.Income} setAccountStates={editAccountsOrder(AccountType.Income)} />
			{/**Make draggable size*/}
			<div />
			<h1>Expenses</h1>
			<hr/>
			<AccountTileList accountStates={() => accountsOrder.Expense} setAccountStates={editAccountsOrder(AccountType.Expense)}/>
        </div>
   )
}

export default AccountSheet;
