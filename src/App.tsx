import type { Component } from 'solid-js';

import Header from 'components/header/header';

import styles from 'styles/app.module.scss';

const App: Component = () => {
  return (
    <div class={styles.App}>
		<Header />
    </div>
  );
};

export default App;
