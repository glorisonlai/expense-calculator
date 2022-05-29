import type {Component} from 'solid-js';

import {useForm} from 'utils/formvalidator';
import {AccountType, Timespan} from 'models/account';
import ErrorMessage from 'components/error/errorMessages';

const Account: Component<{updateAccount: Function}> = ({updateAccount}) => {
	const {validate, formSubmit, errors} = useForm({
		errorClass: "error-input"
	});

	const validateAccountType = ({value}: HTMLInputElement) => 
		Object.values(AccountType).includes(value);
	
	
	const handleSubmit = (form: HTMLFormElement) => {
		console.log(form);
	}

	return (
		<div>
			<form use:formSubmit={handleSubmit}>
				{
					<input id="accountTitle" name="title" required={true} placeholder="New Account" autofocus={true}/>
					{errors.title && <ErrorMesage error={errors.title} />}
				}
				{
				<>
					<label>I am creating a </label>
					<select id="accountType">
						<option value={AccountType.Income}>Income</option>
						<option value={AccountType.Expense}>Expense</option>
					</select>
					<label> report.</label>
				</>}
				{
				<>
				<label>I am {}</label>
				<input type="numeric"/>
				<label> every </label>
				<select id="accountTimespan">
					<option value={Timespan.Week}>Week</option>
					<option value={Timespan.Month}>Month</option>
					<option value={Timespan.Quarter}>Quarter</option>
					<option value={Timespan.Year}>Year</option>
				</select>
				<label>.</label>
				</>
				}
				{
				<>
				<label>I am paying </label><input type="numeric"/><label> per </label><option /><label>.</label>
				</>
				}
				<button type="submit">Save</button>
			</form>
		</div>
	);
}	

