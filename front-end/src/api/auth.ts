import { USER_SERVICE_URL } from '@/constants/api';
import instance from './axiosConfig';

const URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1/auth`;
class Auth {
  async login(email: string, password: string) {
    const response = await instance.post(`${URL}/salesynctest/login`, {
      username: email,
      password
    });

    return response.data;
  }

  async logOut() {
    const response = await instance.post(`${URL}/logout`);
    return response.data;
  }

  async getUser() {
    const response = await instance.get(`${USER_SERVICE_URL}/me`);
    return response.data;
  }
}

const auth = new Auth();
export default auth;
