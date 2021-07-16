import React, {useState} from 'react';
import LanguageDetect from 'languagedetect';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {vowels} from '../../vowels';
import {SearchPanel, List} from '../';

import styles from './app.module.scss';

export function App() {
    const [data, setData] = useState([]);

    const lngDetector = new LanguageDetect();
    const toastError = (text) => toast.error(text, {
        position: 'top-right',
        autoClose: 4000
    });

    const getVowels = (text) => vowels[lngDetector.detect(text)[0][0]] || vowels['default'];

    const fetchData = (id) => {
        fetch(`http://cors-anywhere.herokuapp.com/tmgwebtest.azurewebsites.net/api/textstrings/${id}`, {
            headers: {
                'TMG-Api-Key': '0J/RgNC40LLQtdGC0LjQutC4IQ=='
            }
        })
            .then((res) => res.json())
            .then(str => {
                const {text} = str;
                return {
                    text,
                    wordsQty: text.split(' ').length,
                    vowelsQty: text.match(getVowels(text))?.length || 0,
                    vowels: getVowels(text)
                };
            })
            .then(data => setData(prev => [...prev, data]))
            .catch(() => toastError('Ошибка запроса'));
    };

    const countHandler = (value) => {
        setData([]);
        const idsArray = [...new Set(value.split(/[,;]/).map(id => id.replace(/\s/g, '')))];
        const correctIdsArray = idsArray.map(id => Number(id)).filter(id => (id >= 1) && (id <= 20));
        const incorrectIdsArray = idsArray.filter(id => !correctIdsArray.includes(Number(id)));

        correctIdsArray.forEach(id => fetchData(id));
        incorrectIdsArray.forEach(id => toastError(`Некорректный id: ${id}`));
    };

    return (
        <div className={styles.app}>
            <SearchPanel countHandler={countHandler}/>
            {data.length > 0 ? <List data={data}/> : ''}
            <ToastContainer/>
        </div>
    );
}
