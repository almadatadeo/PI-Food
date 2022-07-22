import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={style.landingpage__container}>
            <h1>Food Recipes</h1>
            <Link to='/home'><button>ENTER</button></Link>
        </div>
    )
}