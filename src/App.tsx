import React from 'react';
import styles from './App.module.css'
import {getDataFromApi} from "./api";
import Autocomplete from "./components";


function App() {
    return (
        <div className={styles.app}>
            <Autocomplete placeholder="Enter book title" getData={getDataFromApi}/>
        </div>
    );
}

export default App;
