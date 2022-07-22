import React from 'react';

import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {searchRecipesByName} from '../actions/index';
import style from './SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchRecipesByName(name));
        setName('');
    }

    return (
        <div>
            <form className={style.searchBar} onSubmit={e => {handleSubmit(e)}}>
                <input type='text' placeholder='Search' value={name} onChange={(e) => {handleInputChange(e)}}/>
                <button type='submit'>GO!</button>
            </form>
        </div>
    )
}