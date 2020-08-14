import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

const Layout = (props) => {
    const [sideDrawerIsVisbible, setSideDrawerIsVisbible] = useState('false')

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisbible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisbible(!sideDrawerIsVisbible)
    }

    return (
        <Aux>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuth={props.isAuthenticated}
            />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisbible}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);