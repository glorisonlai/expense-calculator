import type {Component} from 'solid-js';
import type {AccountState} from 'pages/accountSheet';
import type {Account} from 'models/account';

import Modal from 'components/modal/overlayModal';
import { Timespan } from 'utils/time';
import AccountForm from 'components/accountModal/accountModal';
import { createAccount, AccountType } from 'models/account';
import AccountTile from 'components/accountTile/accountTile';
import {createSignal, For, Show} from 'solid-js';

const AccountTileList: Component<{accountType: AccountType, accountStates: () => readonly AccountState[], setAccountStates: Function}> = ({accountType, accountStates, setAccountStates}) => {
	// prospective new account modal
	const [accountModalValues, setAccountModalValues] = createSignal<Account | null>(null);
	
	// Index to use
	const [updateAccountIndex, setUpdateAccountIndex] = createSignal<number>(accountStates().length);

	const toggleAccountTile = (index: number) => {
		setAccountStates(accountStates().map((e, i) => i !== index ? e : {
			...e,
			disabled: !e.disabled,
		}));
	};

	const initializeDefaultModalValues = (): Account => createAccount(accountType, '', Timespan.Month, '', 0);

	const createNewAccountModal = () => {
		setUpdateAccountIndex(accountStates().length);
		setAccountModalValues(initializeDefaultModalValues());
	}

	const createUpdateAccountModal = (i: number, account: Account) => {
		setUpdateAccountIndex(i);
		setAccountModalValues(account);
	}

	const pushNewAccount = (account: Account) => {
		const newAccountState: AccountState = {
			disabled: false,
			account,
		};

		console.log([...accountStates(), newAccountState])

		setAccountStates([...accountStates(), newAccountState]);
	}

	const updateAccount = (index: number, account: Account) => {
		closeModal();
		if (index >= accountStates().length) return pushNewAccount(account);

		setAccountStates(accountStates().map((e, i) => i !== index ? e : {
			...e,
			account
			}
		));
		console.log(accountStates());
	}

	const deleteAccount = (index: number) => {
		setAccountStates(accountStates().filter((_, i) => i !== index));
	}

	const closeModal = () => setAccountModalValues(null)

	return (
		<div>
			<button onclick={createNewAccountModal}> Create new Account </button>
			<Show when={accountModalValues()}>
					<Modal callback={closeModal}>
						<AccountForm account={accountModalValues()!} updateAccount={(account: Account) => updateAccount(updateAccountIndex(), account)}/>
					</Modal >
			</Show>
			<For each={accountStates()}>
				{(accountState, i) => 
					<AccountTile 
						id={i()} 
						account={() => accountState.account} 
						disabled={() => accountState.disabled} 
						toggleAccount={() => toggleAccountTile(i())} 
						updateAccount={() => createUpdateAccountModal(i(), accountState.account)} 
						deleteAccount={() => deleteAccount(i())} 
					/>
			}</For>
		</div>
	)
};

export default AccountTileList;
