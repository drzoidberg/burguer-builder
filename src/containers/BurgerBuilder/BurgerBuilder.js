import React, { Component } from 'react';
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


class BurgerBuilder extends Component {
    state = {
        currency: '€',
        purchasing: false,
    };

    componentDidMount() {
        console.log('[BurgerBuilder][componentDidMount]', this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0;
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.history.push('/auth');
        }
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        this.props.onInitPurchase();
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }


    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        // console.log('ingredients', this.props.ings);
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        currency={this.state.currency}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                currency={this.state.currency}
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

const mapstateToProps =  state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapstateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));