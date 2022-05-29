import type {Component} from 'solid-js';

const ErrorMessage: Component<{error: string}> = ({error}) => <span class="error-message">{error}</span>;

export default ErrorMessage;

