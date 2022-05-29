import type {Account} from 'models/account';

export type AccountTileState = {
	hidden: boolean,
	index: number,
}

const AccountTile: JSX.Element<{id: number, account: Account, hidden: boolean}> = (props) => {
    return (
        <div>
            <input type="checkbox"/>
            <h1>{props.account.title}</h1>
            <h2>{props.account.description}</h2>
            <h2>{props.account.amount}</h2>
        </div>
       )
}

export default AccountTile;
