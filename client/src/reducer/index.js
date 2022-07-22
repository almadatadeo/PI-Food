export const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: []
}
function rootReducer(state=initialState, action){
    switch(action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'FILTER_BY_DIET':
            const all = state.allRecipes;
            const filterDiet = action.payload === 'all' ? all : all.filter(e => e.diets.find(n => n.name === action.payload))
            return {
                ...state,
                recipes: filterDiet
            }
        case 'SORTED_BY_NAME':
            let sorted = action.payload === 'asc' ?
            state.recipes.sort(function(firstValue, secondValue) {
                if(firstValue.name.toUpperCase() > secondValue.name.toUpperCase()) return 1;
                if(firstValue.name.toUpperCase() < secondValue.name.toUpperCase()) return -1;
                return 0;
            })
            :
            state.recipes.sort(function(firstValue, secondValue) {
                if(firstValue.name.toUpperCase() < secondValue.name.toUpperCase()) return 1;
                if(firstValue.name.toUpperCase() > secondValue.name.toUpperCase()) return -1;
                return 0;
            })
            return {
                ...state,
                recipes: sorted
            }
        case 'SEARCH_BY_NAME':
            return {
                ...state,
                recipes: action.payload
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'ORDER_BY_SCORE':
            let score = action.payload == 'desScore' ?
            state.recipes.sort(function(firstValue,secondValue){
                if(firstValue.healthScore > secondValue.healthScore) {
                    return 1
                }
                if(secondValue.healthScore > firstValue.healthScore) {
                    return -1
                }
                return 0
            }) :
            state.recipes.sort(function(firstValue, secondValue){
                if(firstValue.healthScore > secondValue.healthScore) {
                    return -1
                }
                if(secondValue.healthScore > firstValue.healthScore) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: score
            }
        default: 
            return state
    }

}

export default rootReducer;