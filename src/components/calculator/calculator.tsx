import type {Account} from 'models/account';
import type {AccountTileState} from 'components/accountTile/accountTile';

import AccountTileList from 'components/accountTileList/accountTileList';
import {createSignal} from 'solid-js';
import {createAccount, AccountType} from 'models/account';

const Calculator = () => {
    const [accounts, setAccounts] = createSignal<Account[]>([]);
	const [accountsOrder, setAccountsOrder] = createSignal<AccountTileState[]>([]);

	const pushAccount = (account: Account) => {
		setAccounts([...accounts(), account]);
		setAccountsOrder([...accountsOrder(), {hidden: false, index: accounts().length - 1}]);
	}


    return (
        <div>
			<AccountTileList accountTiles={accountsOrder()} accounts={accounts()} />
			<button onclick={() => pushAccount(createAccount(AccountType.Income, 'title', 'desc', 2))} />
        </div>
   )
}

export default Calculator;
