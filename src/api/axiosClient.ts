
import axios from "axios";

const axiosClient = axios.create({
   baseURL: "http://localhost:3000/api",
   timeout: 10000,
});

// Add request interceptor
axiosClient.interceptors.request.use(
   function (config) {
      // Add authorization header with JWT token
      const token = localStorage.getItem('token');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

// Add response interceptor
axiosClient.interceptors.response.use(
   function (response) {
      // Return data property from the response
      return response.data;
   },
   function (error) {
      // Handle specific error cases
      if (error.response) {
         // Server responded with error status
         return Promise.reject(error.response.data);
      } else if (error.request) {
         // Request made but no response received
         return Promise.reject({ message: 'No response from server' });
      } else {
         // Other errors
         return Promise.reject({ message: error.message });
      }
   }
);

export default axiosClient;