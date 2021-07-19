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

    //fetch function that allows get param 'text' from data and calculation words and vowels quantity
    //I used a third-party service http://cors-anywhere.herokuapp.com to get the data
    //for a successful fetching, you need to get access on this site
    const fetchData = (id) => {
        fetch(`http://cors-anywhere.herokuapp.com/tmgwebtest.azurewebsites.net/api/textstrings/${id}`, {
            headers: {
                'TMG-Api-Key': '0J/RgNC40LLQtdGC0LjQutC4IQ=='
            }
        })
            .then((res) => res.json())
            .then(data => {
                const {text} = data;
                return setData(prev => [...prev, {
                    text,
                    wordsQty: text.split(' ').length,
                    vowelsQty: text.match(getVowels(text))?.length || 0
                }]);
            })
            .catch(() => toastError('Ошибка запроса'));
    };

    //function calculates arrays of correct and incorrect ids.
    //for the correct id, we call fetch function, for the incorrect - toast with error
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
