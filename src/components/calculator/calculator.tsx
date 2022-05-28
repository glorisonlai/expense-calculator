import type {Account, AccountType} from 'models/account';

import AccountTile from 'components/accountTile/accountTile';
import {createSignal} from 'solid-js';
import {createAccount} from 'models/account';

const Calculator = () => {
    const [accounts, setAccounts] = createSignal<Account[]>([]);

    return (
        <div>
        {accounts().map((account: Account) => (
            <AccountTile account={account}/>
                    ))}

            <button onclick={() => setAccounts(() => accounts().push(createAccount(AccountType.Income, 'hello', '1', 1)))} />
        </div>
       )
}

export default Calculator;
