import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';


const withErrorHandler = (WrapperdComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const requestInterceptor = axios.interceptors.response.use(request => {
            setError(null);
            return request;
        });
        const responseInterceptor = axios.interceptors.response.use(response => response, err => {
            setError(err);
        });

        // the componentWillUnmount equivalent
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, [requestInterceptor, responseInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                        Something didn't work!
                    </Modal>
                <WrapperdComponent {...props} />
            </Aux>
        );
    }
}


export default withErrorHandler;