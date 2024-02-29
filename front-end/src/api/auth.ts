import { USER_SERVICE_URL } from "@/constants/api";
import instance from "./axiosConfig";

class Auth {

  constructor() {
    
  }

  async login(username: string, password: string) {
    const response = await instance.post(`${USER_SERVICE_URL}/login`, {
      username,
      password,
    });

    return response.data;
  }

  async logOut() {
    const response = await instance.post(`${USER_SERVICE_URL}/logout`);
    return response.data;
  }

  async getMyInfo() {
    const response = await instance.get(`${USER_SERVICE_URL}/me`);
    return response.data;
  }
}

const auth = new Auth();
export default auth;