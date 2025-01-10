import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/Calender-Website', // Replace with your API's base URL
  withCredentials: true, // If using cookies for authentication
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to the root
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;