import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {
    let transformedIngedients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => { return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} /> });  // way to transform an object of key-value pairs to an array of burger ingredients
        })
        .reduce((array, element) => {
            return array.concat(element)
        }, []);
        // using .reduce() allows us to flatten the array (get rid of all its structure) only if the state, this is the amounts, total 0

        if (transformedIngedients.length === 0) {
            transformedIngedients = <p>Please start adding ingredients</p>
        }


    // console.log(transformedIngedients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngedients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;