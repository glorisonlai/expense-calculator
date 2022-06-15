import type {Account} from 'models/account';
import type {Component} from 'solid-js';

import {Timespan} from 'utils/time';

const AccountTile: Component<{
	id: number, 
	account: () => Account, 
	disabled: () => boolean,
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

	const timeLabels = (time: Timespan) => {
		switch(time) {
			case(Timespan.Week): 
				return "/Week"
			case(Timespan.Month): 
				return "/Month"
			case(Timespan.Year): 
				return "/Year"
			case(Timespan.Quarter): 
				return "/Quarter"
			default: 
				return ""
		}
	}

    return (
        <div style={{background: disabled() ? 'gray': 'white'}} id={`tile-${id}`} class={`${disabled() && 'disabled'}`} >
            <input type="checkbox" checked={disabled()} onchange={() => toggleAccount()}/>
            <button onclick={() => deleteAccount()}> Delete </button>
						<div onClick={() => updateAccount()}>
		            <h1>{account().title}</h1>
		            <h2>{account().description}</h2>
		            <h2>{account().amount}{timeLabels(account().timespan)}</h2>
						</div>
        </div>
       )
}

export default AccountTile;
