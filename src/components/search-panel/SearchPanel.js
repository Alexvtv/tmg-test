import React, {useState} from 'react';

import styles from './searchPanel.module.scss';

export function SearchPanel(props) {
    const {countHandler} = props;

    const [searchValue, setSearchValue] = useState('');

    const handler = (value) => {
        setSearchValue('');
        countHandler(value);
    }

    return (
        <div className={styles.panel}>
            <p className={styles.clarification}>Идентификаторы строк:</p>
            <input className={styles.input} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button className={styles.button} onClick={() => handler(searchValue)}>Подсчитать</button>
        </div>
    );
}
