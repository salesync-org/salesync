import instance from './axiosConfig';

const URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1`;

class Auth {
  async signUp(signUpInfo: SignUpInfo) {
    const response = await instance.post(`${URL}/auth/realm/create`, signUpInfo);
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
    const response = await instance.get(`${URL}/user/${companyName}/loaduser`);

    return response.data;
  }

  async updateUser(companyName: string, updatedUser: User) {
    // console.log(JSON.stringify(updatedUser));
    const response = await instance.post(`${URL}/user/${companyName}/user/modify`, 
      updatedUser
    );

    return response.data;
  }
}

const auth = new Auth();
export default auth;
