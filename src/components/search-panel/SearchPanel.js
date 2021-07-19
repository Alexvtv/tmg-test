import React, {useState} from 'react';

import styles from './searchPanel.module.scss';

export function SearchPanel(props) {
    const [searchValue, setSearchValue] = useState('');

    const countHandler = (value) => {
        setSearchValue('');
        props.countHandler(value);
    }

    return (
        <div className={styles.panel}>
            <p className={styles.clarification}>Идентификаторы строк:</p>
            <input className={styles.input} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button className={styles.button} onClick={() => countHandler(searchValue)}>Подсчитать</button>
        </div>
    );
}
