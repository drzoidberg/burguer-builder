import React, { Component } from 'react'

import Order from '../../components/Order/Order';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                // how to turn an object into an array using a for...in loop
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }

    render() {
        return(
            <Aux>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </Aux>
        );
    }
}

export default withErrorHandler(Orders, axios);