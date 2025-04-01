import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function sendAuthenticatedRequest<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = null
): Promise<AxiosResponse<T>> {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('No access token found in local storage');
  }

  const config: AxiosRequestConfig = {
    url,
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data,
    validateStatus: () => {
      // Accept all status codes
      return true;
    },
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error sending authenticated request:', error);
    throw error;
  }
}
