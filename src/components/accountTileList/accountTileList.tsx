import type {AccountTileState} from 'components/accountTile/accountTile';
import type {Account} from 'models/account';

import AccountTile from 'components/accountTile/accountTile';
import {For} from 'solid-js';

const AccountList = (props: {accountTiles: AccountTileState[], accounts: Account[]}) => (
	<For each={props.accountTiles}>
		{(accountTile, i) => {
			const account = props.accounts[accountTile.index];
			return <AccountTile id={i} account={account} hidden={accountTile.hidden} />
		}
	}</For>
);

export default AccountList
