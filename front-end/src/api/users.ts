import instance from './axiosConfig';

const BASE_URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1/auth`;

// Create a user within a realm
export const createUser = async (realmId: string, user: NewUser, accessToken: string) => {
  try {
    const response = await instance.post(`${BASE_URL}/${realmId}/user/create`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Reset password for a user
export const resetPassword = async (userId: string, newPassword: string, accessToken: string) => {
  try {
    const response = await instance.put(`${BASE_URL}/users/${userId}/reset-password`, { newPassword }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};