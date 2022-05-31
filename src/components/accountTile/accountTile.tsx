import type {Account} from 'models/account';
import type {Component} from 'solid-js';

const AccountTile: Component<{
	id: number, 
	account: Account, 
	disabled: boolean,
	toggleAccount: Function,
	updateAccount: Function,
	deleteAccount: Function,
}> = ({
	id, 
	account, 
	disabled,
	toggleAccount,
	updateAccount,
	deleteAccount,
}) => {
    return (
        <div id={`tile-${id}`} class={`${disabled && 'disabled'}`} onclick={() => updateAccount()}>
            <input type="checkbox" checked={disabled} onchange={() => toggleAccount()}/>
            <button onclick={() => deleteAccount()}> Delete </button>
            <h1>{account.title}</h1>
            <h2>{account.description}</h2>
            <h2>{account.amount}</h2>
        </div>
       )
}

export default AccountTile;
