import type {Component} from 'solid-js';
import type {AccountState} from 'pages/accountSheet';
import type {Account} from 'models/account';

import { Timespan } from 'utils/time';
import AccountForm from 'components/accountModal/accountModal';
import Modal from 'components/modal/modal';
import { createAccount, AccountType } from 'models/account';
import AccountTile from 'components/accountTile/accountTile';
import {createSignal, For, Show} from 'solid-js';

const AccountList: Component<{accountStates: AccountState[], setAccountStates: Function}> = ({accountStates, setAccountStates}) => {
	const [accountModalValues, setAccountModalValues] = createSignal<Account | null>(null);
	
	// Index to use
	const [updateAccountIndex, setUpdateAccountIndex] = createSignal<number>(accountStates.length);

	const toggleAccountTile = (i: number) => {
		accountStates[i].disabled = !accountStates[i].disabled;
		setAccountStates(accountStates);
	}

	const initializeDefaultModalValues = (): Account => createAccount(AccountType.Income, '', Timespan.Month, '', 0);

	const createNewAccountModal = () => {
		setUpdateAccountIndex(accountStates.length);
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

		setAccountStates([...accountStates, newAccountState]);
	}

	const updateAccount = (i: number, account: Account) => {
		if (i === accountStates.length) return pushNewAccount(account);

		accountStates[i].account = account;
		setAccountStates(accountStates);
	}

	const deleteAccount = (index: number) => {
		const stop = accountStates.length - 1;

		while (index < stop) {
			accountStates[index] = accountStates[++index];
		}

		accountStates.pop();
		setAccountStates(accountStates);
	}

	const closeModal = () => setAccountModalValues(null)

	return (
		<div>
			<button onclick={createNewAccountModal}> Create new Account </button>
			<Show when={accountModalValues()}>
				<Modal clickOutside={closeModal}>
					<AccountForm account={accountModalValues()!} updateAccount={(account: Account) => updateAccount(updateAccountIndex(), account)}/>
				</Modal>
			</Show>
			<For each={accountStates}>
				{(accountState, i) => 
					<AccountTile 
						id={i()} 
						account={accountState.account} 
						disabled={accountState.disabled} 
						toggleAccount={() => toggleAccountTile(i())} 
						updateAccount={() => createUpdateAccountModal(i(), accountState.account)} 
						deleteAccount={() => deleteAccount(i())} 
					/>
			}</For>
		</div>
	)
};

export default AccountList;
