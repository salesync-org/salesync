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
    localStorage.setItem('access_token', access_token);
    window.location.href = '/cheatsheet';
  } catch (error) {
    console.error('Error:', error);
    window.location.href = '/cheatsheet';
  }
}