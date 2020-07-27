import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem likk="/" active>Burger Builder</NavigationItem>
        <NavigationItem likk="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;