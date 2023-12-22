import axios from 'axios';

const auth = axios.create({ baseURL: import.meta.env.VITE_APP_SERVER_AUTH_URL });

export default auth;