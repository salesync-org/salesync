import instance from './axiosConfig';

const URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1`;

class Auth {
  async signUp(signUpInfo: SignUpInfo) {
    const response = await instance.post(`${URL}/create`, signUpInfo);
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

  async getUser(companyName: string) {
    const response = await instance.get(`${URL}/${companyName}/user`);

    return response.data;
  }

  async updateUser(companyName: string, updatedUser: User) {
    const response = await instance.put(`${URL}/${companyName}/user`, updatedUser);

    return response.data;
  }

  async verifyEmail() {
    const response = await instance.get(`${URL}/verify-email`, {
    });

    return response.data;
  }

  async changePassword(companyName: string, userId: string, password: string) {
    const response = await instance.put(`${URL}/${companyName}/user/password`, {
      user_id: userId,
      new_password: password
    });

    return response.data;
  }
}

const auth = new Auth();
export default auth;
