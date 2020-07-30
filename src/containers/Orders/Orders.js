import React, { Component } from 'react'

import Order from '../../components/Order/Order';
import Aux from '../../hoc/Aux/Aux';


class Orders extends Component {
    render() {
        return(
            <Aux>
                <Order />
                <Order />
            </Aux>
        );
    }
}

export default Orders;