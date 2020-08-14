import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler';


const withErrorHandler = (WrapperdComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios)

        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={clearError}
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