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
                diets: e.diets.map(e => {return {name: e}}),
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

router.get('/', async (req,res) => {
    const name = req.query.name;
    const allData = await getAllData();
    try {
    if (name) {
        let recipeName = await allData.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        if(recipeName.length > 0) {
            res.status(200).send(recipeName);
        } else {
            res.status(404).send('Recipe not found');
        }
    } else {
        res.status(200).send(allData);
    }
    }
    catch (error) {
        console.error(error);
    }
});

router.get('/:id', async (req,res) => {
    const id = req.params.id;
    const allData = await getAllData();
    try {
        if(id){
            let recipeId = await allData.filter(e => e.id == id);
                if(recipeId.length > 0) {
                    res.status(200).send(recipeId);
                } else {
                    res.status(404).send('Recipe not found')
                }
        }
        
    }
    catch (error) {
        console.error(error);
    }
})
module.exports = router;