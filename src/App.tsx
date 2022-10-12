import React from 'react';
import styles from './App.module.css';
import {Autocomplete} from "./components";

function App() {
  return (
    <div className={styles.app}>
      <Autocomplete/>
    </div>
  );
}

export default App;
