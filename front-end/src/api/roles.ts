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

export const loadPermimssions = async (realmId: string) => {
  try {
    const response = await instance.get(`${BASE_URL}/${realmId}/permissions`);
    return response.data;
  } catch (error) {
    console.error('Error getting permissions:', error);
    throw error;
  }
};

export const createRole = async (realmId: string, role: Role) => {
  try {
    const response = await instance.post(`${BASE_URL}/${realmId}/roles`, role);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
};

export const assignRole = async (realmId: string, roleName: string, userId: string) => {
  try {
    const response = await instance.put(`${BASE_URL}/${realmId}/role/assign`, { user_id: userId, role_name: roleName });
    return response.data;
  } catch (error) {
    console.error('Error assigning role:', error);
    throw error;
  }
}
