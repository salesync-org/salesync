import auth from '@/api/auth';

export async function sendRequest(username: string, password: string) {
  try {
    const { access_token } = await auth.login(username, password);

    // Save access token to localStorage
    localStorage.setItem('access_token', access_token);
    window.location.href = '/cheatsheet';
  } catch (error) {
    console.error('Error:', error);
    // window.location.href = '/cheatsheet';
  }
}