import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-order';

import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/';


export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients()
    }, []);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseContinueHandler = () => {
        props.history.push('/checkout');
        props.onInitPurchase();
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }


    const disabledInfo = {
        ...props.ings
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    // console.log('ingredients', props.ings);
    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    disabled={disabledInfo}
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    ordered={purchaseHandler}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    isAuth={props.isAuthenticated}
                />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={props.ings}
            price={props.price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

const mapstateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));