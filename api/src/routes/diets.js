const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {Recipe, Diet} = require('../db');

const {API_KEY} = process.env;

const getApiData = async () => {
    try {
        const apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const apiDatas = apiData.data.results;

        let info = await apiDatas.map((e) => {
            return {
                id: e.id,
                name: e.title,
                vegetarian: e.vegetarian,
                vegan: e.vegan,
                glutenFree: e.glutenFree,
                dairyFree: e.dairyFree,
                image: e.image,
                healthScore: e.healthScore, 
                diets: e.diets.map(e => e),
                summary: e.summary,
                steptostep: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps ? 
                e.analyzedInstructions[0].steps.map(n => n.step).join(" \n") :
                'no steps')
            }
        })
        
        return info;
    } 
    catch (error) {
        console.error(error);
        return ([]);
    }
}

const getDBData = async () => {
    try {
        return await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
    }
    catch (error) {
        console.error(error);
        return ([]);
    }
}

const getAllData = async () => {
    try {
        const apiData = await getApiData(); const dbData = await getDBData();
        const allData = apiData.concat(dbData);
        return allData;
    }
    catch (error) {
        console.error(error);
        return ([]);
    }
}

const getDietData = async () => {
    const allData = await getAllData();
    const allDiet = allData.map(e => e.diets);
    var allDiets = [];
    for(let i = 0; i < allDiet.length; i++) {
        allDiets = allDiets.concat(allDiet[i]);
    };
    const allDietsData = new Set(allDiets);
    let info = [...allDietsData];
    return info;
}


router.get('/', async (req, res) => {
    try{
        let diets = await Diet.findAll();
        if(diets.length <= 0){
            const allDiets = await getDietData();
            allDiets.forEach(e => {
                Diet.create({
                    name: e
                })
            })
        }
        res.status(200).json(diets);
    }
    catch (error) {
        res.status(404).send(error)
    }
})


module.exports = router;