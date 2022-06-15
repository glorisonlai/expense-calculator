import type {Component} from 'solid-js';
import type {Account} from 'models/account';

import {indefiniteArticle} from 'utils/grammarRules';
import {useForm} from 'utils/formvalidator';
import {Timespan} from 'utils/time';
import {AccountType } from 'models/account';
import ErrorMessage from 'components/error/errorMessages';
import {Show} from 'solid-js';

const AccountForm: Component<{account: Account, updateAccount: Function}> = ({account, updateAccount}) => {
	const {formVals, validate, formSubmit, errors} = useForm("error-input");

	const validateAccountType = ({value}: HTMLInputElement) => 
		Object.values(AccountType).includes(value);
	
	
	const handleSubmit = (form: HTMLFormElement) => {
		updateAccount({
			title: formVals["title"].ref.value,
			type: formVals["type"].ref.value,
			amount: parseInt(formVals["amount"].ref.value),
			timespan: parseInt(formVals["timespan"].ref.value),
			description: formVals["description"].ref.value,
		} as Account);
		console.log(form);
	}
	
	const getAccountTypeVerb = (type: AccountType) =>  type === AccountType.Income ? 'earning' : 'paying';
	
	return (
		<div>
			<form use:formSubmit={handleSubmit}>
				{
					<>
						<input id="accountTitle" name="title" required={true} placeholder="New Account" autofocus={true} value={account.title} use:validate={{validators: []}}/>
						<Show when={!!errors.title}>
							<ErrorMessage error={errors.title} />
						</Show>
					</>
				}
				{
					<>
						<label>I am creating {indefiniteArticle(account.type)} </label>
						<select id="accountType" name="type" use:validate={validators=[]} >
							<option value={AccountType.Income} selected={account.type === AccountType.Income && "selected"}>Income</option>
							<option value={AccountType.Expense} selected={account.type === AccountType.Expense && "selected"}>Expense</option>
						</select>
						<label> report.</label>
					</>
				}
				{
					<>
						<label>I am {getAccountTypeVerb(account.type)} </label>
						<input type="number" name="amount" value={account.amount} use:validate={validators=[]} />
						<label> every </label>
						<select id="accountTimespan" name="timespan" use:validate={validators=[]} >
							<option value={Timespan.Week} selected={account.timespan === Timespan.Week && "selected"}>Week</option>
							<option value={Timespan.Month} selected={account.timespan === Timespan.Month && "selected"}>Month</option>
							<option value={Timespan.Quarter} selected={account.timespan === Timespan.Quarter && "selected"}>Quarter</option>
							<option value={Timespan.Year} selected={account.timespan === Timespan.Year && "selected"}>Year</option>
						</select>
						<label>.</label>
					</>
				}
				{
					<input name="description" placeholder="What is this for?" value={account.description || ""} use:validate={validators=[]} />
				}
				<button type="submit">Save</button>
			</form>
		</div>
	);
}	

export default AccountForm;
