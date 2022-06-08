import { createStore } from "solid-js/store";

const checkValid = ({ element, validators = [] }: {element: HTMLInputElement, validators: Function[]}, setErrors: Function, errorClass: string) => {
  return async () => {
    element.setCustomValidity("");
    element.checkValidity();
    let message = element.validationMessage;
    if (!message) {
      for (const validator of validators) {
        const text = await validator(element);
        if (text) {
          element.setCustomValidity(text);
          break;
        }
      }
      message = element.validationMessage;
    }
    if (message) {
      errorClass && element.classList.toggle(errorClass, true);
      setErrors({ [element.name]: message });
    }
  };
}

export const useForm = <F>({ form, errorClass }: {form: F, errorClass: string}) => {
	const newErrorObj = Object.keys(form).
							reduce((errorObj, key) => (
								{...errorObj, [key]: ''}
							), {});

	const [formVals, setFormVals] = createStore<F>(form);
	const [errors, setErrors] = createStore<{[key: keyof F]: string}>(newErrorObj);

	const validate = (ref: HTMLInputElement, accessor: ((ref: HTMLElement) => boolean)[]) => {
		const config = {element:ref, validators: accessor};

		ref.onblur = checkValid(config, setErrors, errorClass);

		ref.oninput = () => {
			setFormVals(ref.name, ref.value);

			if (!errors[ref.name]) return;
			setErrors({ [ref.name]: undefined });
			errorClass && ref.classList.toggle(errorClass, false);
		};
	};

	const formSubmit = (ref: HTMLElement, accessor: Function) => {
	const callback = accessor() || (() => {});

	ref.setAttribute("novalidate", "");

	ref.onsubmit = async (e) => {
	  e.preventDefault();
	  let errored = false;

	  for (const k in formVals) {
		const field = form[k];
		await checkValid(field, setErrors, errorClass)();
		if (!errored && field.element.validationMessage) {
		  field.element.focus();
		  errored = true;
		}
	  }
	  !errored && callback(ref);
	};
	};

	return { formVals, validate, formSubmit, errors };
}

