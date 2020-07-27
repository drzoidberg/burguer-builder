import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformedIngedients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => { return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} /> });  // way to transform an object of key-value pairs to an array of burger ingredients
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngedients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;