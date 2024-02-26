import { USER_SERVICE_URL } from '@/constants/api';
import axios from 'axios';

export async function sendRequest(username: string, password: string) {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/login`,
      {
        username: username,
        password: password
      },
      {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    const { access_token } = response.data;

    // Save access token to localStorage
    localStorage.setItem('accessToken', access_token);
    console.log('Access token:', access_token);
  } catch (error) {
    console.error('Error:', error);
  }
}