import { USER_SERVICE_URL } from '@/constants/api';
import instance from './axiosConfig';

const URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1/auth`;

class Auth {
  async signUp(signUpInfo: SignUpInfo) {
    const response = await instance.post(`${URL}/realm/create`, signUpInfo);
    return response.data;
  }

  async login(companyName: string, email: string, password: string) {
    const response = await instance.post(`${URL}/${companyName}/login`, {
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
