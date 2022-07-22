import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sortedByName, filterRecipesByDiet, getRecipes, orderByScore} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import style from './Home.module.css'

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);


    const [order, setOrder] = useState('');

    // PAGINADO
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const iLastRecipe = currentPage * recipesPerPage;
    const iFirstRecipe = iLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(iFirstRecipe, iLastRecipe);
    

    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect (() => {
        dispatch(getRecipes());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterDiet(e){
        dispatch(filterRecipesByDiet(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(sortedByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    function handleScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    return (
        <div>
            <div className={style.navbar__container}>
                <h1>Food Recipes</h1>
                <Link to= '/recipe'><button className={style.navbar__container__createButton}>Create recipe</button></Link>
                <div className={style.navbar__container_selects}>
                <div className={style.navbar__container_asc}>
                    <select onChange={e => handleSort(e)}>
                        <option disabled selected>Select alphabetical order</option>
                        <option value="asc">Ascendent (A-Z)</option>
                        <option value="des">Descendent (Z-A)</option>
                    </select>
                </div>

                <div className={style.navbar__container_score}>
                    <select onChange={e => handleScore(e)}>
                        <option disabled selected>Selected: All score</option>
                        <option value="ascScore">Ascendent Score</option>
                        <option value="desScore">Descendent Score</option>
                    </select>
                </div>

                <div className={style.navbar__container_diets}>
                    <select onChange={e => handleFilterDiet(e)}>
                    <option disabled selected>Selected: All Recipes</option>
                        <option value="all">All Recipes</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="dairy free">Dairy Free</option>
                        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="whole 30">Whole 30</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="fodmap friendly">Fodmap Friendly</option>
                    </select>
                </div>
                </div>

                <SearchBar/>

            </div>
            
            
            <button className={style.button__reload} onClick={e => handleClick(e)}>Reload</button>
            
            <div>
                    <Paginado 
                    recipesPerPage={recipesPerPage} 
                    allRecipes={allRecipes.length} 
                    paginado={paginado}
                    />
            </div>

            <div className={style.card__container}>
            {
                currentRecipes?.map(e => {
                    return (
                    <Link to={'/recipes/' + e.id} style={{ textDecoration: 'none', color: 'black' }}>
                        <Card name = {e.name} image = {e.image} diets = {e.diets} id = {e.id}/>
                    </Link>
                    )
                })
            }
            </div>
        </div>
        
    )
}