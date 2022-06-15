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


	const [accountsOrder, setAccountsOrder] = createStore<AccountOrder>({
		[AccountType.Income]: [],
		[AccountType.Expense]: [],
	})

	const editAccountsOrder = (key: AccountType) => (account: any) => {
		setAccountsOrder(
			key,
			account,
		);
	}


    return (
        <div>
					<button onclick={() => {console.log(accountsOrder); setAccountsOrder(AccountType.Expense, [...accountsOrder.Expense, {account: {type: AccountType.Expense, amount: 100, timespan: Timespan.Month, title: "blah"}, disabled: false}])}}/>
					<Calculator accounts={accountsOrder} />

					<h1>Income</h1>
					<hr/>
					<AccountTileList accountType={AccountType.Income} accountStates={() => accountsOrder.Income} setAccountStates={editAccountsOrder(AccountType.Income)} />

					{/**Make draggable size*/}
					<div />

					<h1>Expenses</h1>
					<hr/>
					<AccountTileList accountType={AccountType.Expense} accountStates={() => accountsOrder.Expense} setAccountStates={editAccountsOrder(AccountType.Expense)}/>
        </div>
   )
}

export default AccountSheet;
