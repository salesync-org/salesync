import { NewUser } from '@/type';
import axios from 'axios';
import instance from './axiosConfig';
// import { S3 } from 'aws-sdk';

const BASE_URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1`;
const UPLOAD_API_ENDPOINT = `${import.meta.env.VITE_UPLOAD_API_ENDPOINT}`;

// Create a user within a realm
export const createUser = async (realmId: string, user: NewUser, accessToken: string) => {
  try {
    const response = await instance.post(`${BASE_URL}/${realmId}/user/create`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const uploadAvatar = async (userId: string, avatar: File) => {
  // const processedFilename = `avatar_${userId}`;
  // const formData = new FormData();
  // formData.append('image', avatar, processedFilename);

  const config = {
    headers: {
      'Content-Type': avatar.type, // Important for file uploads
      // 'X-Filename': processedFilename
    }
  };

  try {
    console.log('Uploading avatar to ' + UPLOAD_API_ENDPOINT);
    const response = await axios.put(`${UPLOAD_API_ENDPOINT}${userId}`, avatar, config);
    return response;
  } catch (error) {
    console.error('Non-Axios Error:', error);
  }
}

// Reset password for a user
export const resetPassword = async (userId: string, newPassword: string, accessToken: string) => {
  try {
    const response = await instance.put(
      `${BASE_URL}/users/${userId}/reset-password`,
      { newPassword },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }


};
