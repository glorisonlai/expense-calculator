import type { Component } from 'solid-js';

import Header from 'components/header/header';
import Calculator from 'components/calculator/calculator';

import styles from 'styles/app.module.scss';

const App: Component = () => {
  return (
    <div class={styles.App}>
		<Header />
        <Calculator />
    </div>
  );
};

export default App;
