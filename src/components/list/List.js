import React from 'react';

import styles from './list.module.scss';

export function List(props) {
    const {data} = props;

    const Row = ({isHeader, index, text, wordsQty, vowelsQty}) => {
        return <div className={`${styles.row} ${isHeader ? styles.headRow : ''}`} key={index}>
            <div className={styles.text}><p>{text}</p></div>
            <div className={styles.wordsQty}><p>{wordsQty}</p></div>
            <div className={styles.vowelsQty}><p>{vowelsQty}</p></div>
        </div>;
    };

    return (
        <div className={styles.listWrapper}>
            <div className={styles.list}>
                {Row({isHeader: true, index: 'header', text: 'Текст', wordsQty: 'Количество слов', vowelsQty: 'Количество гласных'})}
                {data.map(({text, wordsQty, vowelsQty}, index) => Row({isHeader: false, index, text, wordsQty, vowelsQty}))}
            </div>
        </div>
    );
}
