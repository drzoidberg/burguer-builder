import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQHivH6hVZe20WKFs_n3rH0kEPxUW6WNA';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQHivH6hVZe20WKFs_n3rH0kEPxUW6WNA';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authStart(response.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error))
            });


    }
}
