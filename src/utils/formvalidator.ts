import { createStore } from "solid-js/store";

const checkValid = ({ref, accessors}: {ref: HTMLInputElement, accessors: ValidateProps}, setErrors: Function, errorClass: string) => {
  return async () => {
    ref.setCustomValidity("");
    ref.checkValidity();

    const message = ref.validationMessage;
		const {validators} = accessors;
		
		if (!(validators && validators.length)) return;

    if (!message) {
      for (const validator of validators) {
        const {success, message} = await validator(ref);

        if (!success) {
		      errorClass && ref.classList.toggle(errorClass, true);
					setErrors(ref.name, "success", true);
			    if (message) {
	          ref.setCustomValidity(message);
			    }
          break;
        }
      }
    }
  }
}

const adjustRef = ({ref, accessors}: {ref: HTMLInputElement, accessors: ValidateProps}) => {
	if (!accessors.adjuster) return;

	ref.value = accessors.adjuster(ref);
}

export type FormErrors = {
	[key: string]: boolean,
}

type ValidateProps = {
	validators?: ((...args: any[]) => {success: boolean, message: string})[],
	adjuster?: (...args: any[]) => any,
}

export type ValidatedForm = {
	[key: string]: {
		// State of the field
		ref: HTMLInputElement,
		// Functions that supervise ref
		accessors: ValidateProps,
	}
}

export const useForm = (errorClass: string) => {
	const [formVals, setFormVals] = createStore<ValidatedForm>({});
	const [errors, setErrors] = createStore<FormErrors>({});

	const validate = (ref: HTMLInputElement, accessors: ValidateProps) => {
		setFormVals(ref.name, {
			ref,
			accessors,
		});

		setErrors(ref.name, false);

		const config = formVals[ref.name];

		ref.onblur = checkValid(config, setErrors, errorClass) && adjustRef(config);

		ref.oninput = () => {
			setErrors(ref.name, false);
			errorClass && ref.classList.toggle(errorClass, false);
		};
	};

	const formSubmit = (ref: HTMLElement, accessor: Function) => {
		const callback = accessor() || (() => {});

		ref.setAttribute("novalidate", "");

		ref.onsubmit = async (e) => {
		  e.preventDefault();

		  for (const formFieldName in formVals) {
				const config = formVals[formFieldName];

				await checkValid(config, setErrors, errorClass)();

				if (errors[formFieldName]) {
				  config.ref.focus();
					return;
				}
		  }

		  callback(ref);
		};
	};

	return { formVals, validate, formSubmit, errors };
}

