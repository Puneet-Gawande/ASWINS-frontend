import axios from 'axios';

const API = axios.create({
  baseURL: 'https://aswins-backend.onrender.com' ,
});

export default API;