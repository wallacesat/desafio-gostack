import { Platform } from 'react-native';
import axios from 'axios';

const localhost = Platform.OS === 'ios' ? 'localhost' : '10.0.0.163';

const api = axios.create({
  baseURL: `http://${localhost}:3333`,
});

export default api;
