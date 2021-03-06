import logo from 'assets/logo.svg';
import styles from 'styles/header.module.scss';

const Header = () => (
  <header class={styles.header}>
	<img src={logo} class={styles.logo} alt="logo" />
	<p>
	  Edit <code>src/App.tsx</code> and save to reload.
	</p>
	<a
	  class={styles.link}
	  href="https://github.com/solidjs/solid"
	  target="_blank"
	  rel="noopener noreferrer"
	>
	  Learn Solid
	</a>
  </header>
);

export default Header;
