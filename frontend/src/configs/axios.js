import axios from 'axios';
import { store } from '../app/store';
import { refreshToken } from '../features/authSlice';

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    let {
      auth: { user, token },
    } = store.getState();

    if (user.exp * 1000 < currentDate.getTime()) {
      await store.dispatch(refreshToken());
      token = store.getState().auth.token;
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosJWT };
