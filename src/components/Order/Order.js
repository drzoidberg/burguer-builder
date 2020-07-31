import React from 'react';

import classes from './Order.css'

const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name:ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig =>{
        return <span
            key={ig.name}
            style={{
                border: '1px solid #ccc',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px',
                textTransform: 'capitalize',
            }}
            >{ig.name} ({ig.amount})</span>
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}€</strong></p>
        </div>
    );
};

export default Order;