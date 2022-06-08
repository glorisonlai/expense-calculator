import type {Component, JSX} from 'solid-js';

import {onCleanup} from 'solid-js';

const Modal: Component<{callback: any, children: any}> = (props) => {
	const clickOutside = (el: HTMLElement, callback: JSX.Accessor<Function>) => {
		const onClick = (e: any) => !el.contains(e.target) && callback()?.();

		document.body.addEventListener("click", onClick);

		onCleanup(() => document.body.removeEventListener("click", onClick));
	}

	return (
		<div class="modal" use:clickOutside={props.callback}>
			{props.children}
		</div>
	);
};

export default Modal;

