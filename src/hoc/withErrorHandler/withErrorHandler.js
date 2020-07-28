import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';


const withErrorHandler = (WrapperdComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.response.use(request => {
                this.setState({ error: null });
                return request
            });
            axios.interceptors.response.use(response => response, error => {
                this.setState({ error: null });
            });
        }

        errorConfirmedHandler() {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                        Something didn't work!
                    </Modal>
                    <WrapperdComponent {...this.props} />
                </Aux>
            );
        }
    }
}


export default withErrorHandler;