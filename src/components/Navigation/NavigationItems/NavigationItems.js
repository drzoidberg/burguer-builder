import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem likk="/" active>Burger Builder</NavigationItem>
        <NavigationItem likk="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;