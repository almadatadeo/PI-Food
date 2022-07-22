const {Router} = require('express');
const router = Router();
const {Recipe, Diet} = require('../db');
const recipes = require('./recipes.js');

router.post('/', async(req,res) => {
    let {name, summary, healthScore, image, steptostep, diets, level} = req.body;
    try {
        let createRecipe = await Recipe.create({
            name,
            summary,
            image,
            level,
            healthScore,
            steptostep
        })
        let recipeDiet = await Diet.findAll({
            where: {name: diets}
        })
        createRecipe.addDiet(recipeDiet);
        res.status(200).send('Recipe created.')
    }
    catch (error) {
        console.error(error);
    }
})

module.exports = router;