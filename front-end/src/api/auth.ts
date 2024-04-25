import axios from 'axios';
// import { SignUpInfo, User } from '@/type';
import instance from './axiosConfig';

const URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1`;

const UPLOAD_API_ENDPOINT = `${import.meta.env.VITE_UPLOAD_COMPANY_API_ENDPOINT}`;
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

  async verifyPassword(companyName: string, email: string, password: string) {
    const response = await instance.post(`${URL}/${companyName}/login`, {
      username: email,
      password
    });

    return response; // Return response instead
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

  async loadCompanyInfo(companyName: string) {
    const response = await instance.get(`${URL}/${companyName}/info`);

    return response.data;
  }

  async updateCompanyInfo(companyName: string, companyInfo: CompanyInfo) {
    const response = await instance.put(`${URL}/${companyName}/info`, {
      company_id: companyInfo.company_id,
      company_name: companyInfo.name,
      avatar_url: companyInfo.avatar_url,
      address: companyInfo.address,
      phone: companyInfo.phone,
      tax_code: companyInfo.tax_code
    });
    return response.data;
  }

  async uploadCompanyAvatar(companyId: string, avatar: File) {
    // const processedFilename = `avatar_${userId}`;
    // const formData = new FormData();
    // formData.append('image', avatar, processedFilename);

    const config = {
      headers: {
        'Content-Type': avatar.type // Important for file uploads
        // 'X-Filename': processedFilename
      }
    };

    try {
      console.log('Uploading avatar to ' + UPLOAD_API_ENDPOINT);
      const response = await axios.put(`${UPLOAD_API_ENDPOINT}${companyId}`, avatar, config);
      return response;
    } catch (error) {
      console.error('Non-Axios Error:', error);
    }
  }

  async verifyEmail() {
    const response = await instance.get(`${URL}/verify-email`, {});

    return response.data;
  }

  async validateUser(companyName: string) {
    const response = await instance.get(`${URL}/${companyName}/user/validate`, {});

    return response.data;
  }

  async changePassword(companyName: string, userId: string, password: string) {
    const response = await instance.put(`${URL}/${companyName}/user/password`, {
      user_id: userId,
      new_password: password
    });

    return response.data;
  }

  async changePasswordWithToken(companyName: string, userId: string, password: string, access_token: string) {
    const response = await axios.put(
      `${URL}/${companyName}/user/password`,
      {
        user_id: userId,
        new_password: password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    return response.data;
  }
}

const auth = new Auth();
export default auth;
