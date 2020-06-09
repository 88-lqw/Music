import axios from 'axios';
import config from './axios.config';

const http = axios.create(config);
export default http;
