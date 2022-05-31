import type {IncomeAccount, ExpenseAccount} from 'models/account';

import Calculator from 'components/calculator/calculator';
import AccountTileList from 'components/accountTileList/accountTileList';
import AccountModal from 'components/accountModal/accountModal';
import {createSignal, Show} from 'solid-js';
import {createAccount, AccountType} from 'models/account';

export type AccountState<T = IncomeAccount | ExpenseAccount> = {
	account: T,
	disabled: boolean,
}

const AccountSheet = () => {
    const [incomeAccountsOrder, setIncomeAccountsOrder] = createSignal<AccountState<IncomeAccount>[]>([]);
    const [expenseAccountsOrder, setExpenseAccountsOrder] = createSignal<AccountState<ExpenseAccount>[]>([]);

	const pushAccount = (account: IncomeAccount | ExpenseAccount) => {
		account.type === AccountType.Income
			? setIncomeAccountsOrder([...incomeAccountsOrder(), {account, disabled: false}])
			: setExpenseAccountsOrder([...expenseAccountsOrder(), {account, disabled: false}])
	}


    return (
        <div>
			<Calculator income={incomeAccountsOrder()} expenses={expenseAccountsOrder()} />
			<AccountTileList accountStates={incomeAccountsOrder()} setAccountStates={setIncomeAccountsOrder} />
			<AccountTileList accountStates={expenseAccountsOrder()} setAccountStates={setExpenseAccountsOrder}/>
        </div>
   )
}

export default AccountSheet;
