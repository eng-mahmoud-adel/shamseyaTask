import axios from 'axios';

const request = axios.create({
    baseURL: 'https://staging.mymelior.com/v1/',
});

// request.defaults.headers.common['Authorization'] = `Bearer ${process.env.REQUEST_TOKEN}`;
request.defaults.headers.common['Authorization'] = `Bearer SLSmxK17vjRInEWIiFQjwE1QIDfeSM`;

export default request;