import instance from './axiosConfig';
// import { S3 } from 'aws-sdk';

const BASE_URL = `${import.meta.env.VITE_AUTHENTICATION_HOST}/api/v1`;

// Create a user within a realm
export const loadRoles = async (realmId: string) => {
  try {
    const response = await instance.get(`${BASE_URL}/${realmId}/roles`);
    return response.data;
  } catch (error) {
    console.error('Error getting roles:', error);
    throw error;
  }
};
