import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getDetail} from '../actions/index'
import { Link } from 'react-router-dom';
import style from './Detail.module.css'


export default function Detail (props) {
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch])

    const recipe = useSelector(state => state.detail);
    
    
    return (
        <div className={style.detail__container}>
            {
                recipe.length > 0 ?
                <div>
                    <h1>{recipe[0].name}</h1>
                    <img src={recipe[0].image? recipe[0].image : 'https://thumbs.dreamstime.com/b/error-page-template-website-template-reports-page-not-found-151438536.jpg'} alt="" />
                    <h3>Diets: </h3><p>{recipe[0].diets.map(d => d.name + ', ')}</p>
                    <h5>Summary:</h5> <p>{recipe[0].summary}</p>
                    <h5>Health Score: </h5><p>{recipe[0].healthScore}</p>
                    <h5>Level: </h5><p>{recipe[0].healthScore}</p>
                    <h5>Step to Step: </h5><p>{recipe[0].steptostep}</p>
                </div>
                :
                <h1>Loading</h1>
            }

        <Link to='/home'><button>Back</button></Link>
        </div>
    )

}