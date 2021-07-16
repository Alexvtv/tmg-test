import React from 'react';

import styles from './list.module.scss';

export function List(props) {
    const {data} = props;

    return (
        <div className={styles.listWrapper}>
            <div className={styles.list}>
                <div className={`${styles.row} ${styles.headRow}`}>
                    <div className={styles.text}><p>Текст</p></div>
                    <div className={styles.wordsQty}><p>Количество слов</p></div>
                    <div className={styles.vowelsQty}><p>Количество гласных</p></div>
                </div>
                {data.map((string, i) => {
                        const {text, wordsQty, vowelsQty} = string;

                        return (
                            <div className={styles.row} key={i}>
                                <div className={styles.text}><p>{text}</p></div>
                                <div className={styles.wordsQty}><p>{wordsQty}</p></div>
                                <div className={styles.vowelsQty}><p>{vowelsQty}</p></div>
                            </div>);
                    }
                )}
            </div>
        </div>
    );
}
