import React from 'react';
import style from './Card.module.css';

export default function Card ({name, image, diets, id}) {
    return (
        <div key = {id} className={style.card__container_card}>
            <img src={image} alt={name + ' not found'}/>
            <h4>{name}</h4>
            {
                diets.map(e => <p>{e.name}</p>)
            }
        </div>
    )
}