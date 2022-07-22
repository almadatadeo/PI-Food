import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getDiets, createRecipe} from '../actions/index';
import {useDispatch, useSelector} from 'react-redux';

function validate(input) {
    const reg = new RegExp('^[0-9]+$');
    let errors = {};
    if(!input.name) {
        errors.name = 'Require name'
    } else if(!input.summary) {
        errors.summary = 'Require summary'
    } else if(!input.level || input.level < 0 || input.level > 100 || !reg.test(input.level)) {
        errors.level = 'Require a correct level'
    } else if(!input.healthScore || input.healthScore < 0 || input.healthScore > 100 || !reg.test(input.healthScore)) {
        errors.level = 'Require a correct Health Score'
    }
    return errors;
}

export default function RecipeCreate(){
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});


    const [input, setInput] = useState({
        name: '',
        summary: '',
        image: '',
        level: '',
        healthScore: '',
        steptostep: '',
        diets: []
    })

    useEffect(() => {
        dispatch(getDiets());    
    }, []);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(createRecipe(input));
        alert('Recipe created :)');
        setInput({
        name: '',
        summary: '',
        image: '',
        level: '',
        healthScore: '',
        steptostep: '',
        diets: []
        })
        navigate('/home')
    }

    function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter(name => name !== e)
        })
    }

    return(
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Create recipe</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                        <label>Name:</label>
                        <input type='text' name='name' value={input.name} onChange={handleChange}/>
                    {errors.name && (<h5>{errors.name}</h5>)}
                    </div>
                    <div>
                        <label>Summary:</label>
                        <input type='text' name='summary' value={input.summary} onChange={handleChange}/>
                    {errors.summary && (<h5>{errors.summary}</h5>)}
                    </div>
                    <div>
                        <label>Level:</label>
                        <input type='text' name='level' value={input.level} onChange={handleChange}/>
                    {errors.level && (<h5>{errors.level}</h5>)}
                    </div>
                    <div>
                        <label>Health Score:</label>
                        <input type='text' name='healthScore' value={input.healthScore} onChange={handleChange}/>
                    {errors.healthScore && (<h5>{errors.healthScore}</h5>)}
                    </div>
                    <div>
                        <label>Step to Step:</label>
                        <input type='text' name='steptostep' value={input.steptostep} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type='text' name='image' value={input.image} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Type Diet:</label>
                        <select onChange={(e) => handleSelect(e)}>
                        {diets?.map((d) => (
                            <option value={d.name}>{d.name}</option>
                        ))}
                    </select>
                    </div>
                    {input.diets?.map(e => {
                        return (
                            <div>
                                <h5>{e}</h5>
                                <span onClick={() => handleDelete(e)}>x</span>
                            </div>
                        )
                    })}
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}