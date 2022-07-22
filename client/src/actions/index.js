import axios from 'axios';

export function getRecipes() {
    return async function(dispatch) {
        var json = await axios.get(`http://localhost:3001/recipes`);
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function filterRecipesByDiet(payload) {
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function sortedByName(payload) {
    return {
        type: 'SORTED_BY_NAME',
        payload
    }
}

export function searchRecipesByName(name) {
    return async function(dispatch) {
        var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    return dispatch({
        type: 'SEARCH_BY_NAME',
        payload: json.data
    })
    }
}

export function getDiets() {
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/diets`);
        return dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
}
export function createRecipe(payload){
    return async function(dispatch){
        var json = await axios.post(`http://localhost:3001/recipe`,payload);
        return json;
    }
}
export function getDetail(id){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`);
        return dispatch ({
            type: 'GET_DETAIL',
            payload: json.data
        })
    }

}
export function orderByScore(payload){
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}