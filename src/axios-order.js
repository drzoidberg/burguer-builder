import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-5db37.firebaseio.com/'
});

export default instance;