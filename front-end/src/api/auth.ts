import instance from './axiosConfig';

const URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1`;

class Auth {
  async signUp(signUpInfo: SignUpInfo) {
    const response = await instance.post(`${URL}/auth/create`, signUpInfo);
    return response.data;
  }

  async login(companyName: string, email: string, password: string) {
    const response = await instance.post(`${URL}/auth/${companyName}/login`, {
      username: email,
      password
    });

    return response.data;
  }

  async logOut() {
    const response = await instance.post(`${URL}/auth/logout`);

    return response.data;
  }

  async getUser(companyName: string) {
    const response = await instance.get(`${URL}/user/${companyName}`);

    return response.data;
  }

  async updateUser(companyName: string, updatedUser: User) {
    const response = await instance.put(`${URL}/user/${companyName}`, updatedUser);

    return response.data;
  }
}

const auth = new Auth();
export default auth;
