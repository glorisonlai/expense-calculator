import type {Account} from 'models/account';

import {createSignal} from 'solid-js';

const AccountTile = ({account}: {account: Account}) => {
    const [hidden, setHidden] = createSignal(false);
    
    return (
        <div>
            <input type="checkbox"/>
            <h1>{account.title}</h1>
            <h2>{account.description}</h2>
            <h2>{account.amount}</h2>
        </div>
       )
}

export default AccountTile;
