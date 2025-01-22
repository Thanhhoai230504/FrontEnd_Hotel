
import axios from "axios";

const axiosClient = axios.create({
   // http://localhost:3000
   // https://backend-hotel-1-nqtn.onrender.com
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


axiosClient.interceptors.response.use(
   function (response) {
   
      return response.data;
   },
   function (error) {
      
      if (error.response) {
       
         return Promise.reject(error.response.data);
      } else if (error.request) {
         
         return Promise.reject({ message: 'No response from server' });
      } else {
         
         return Promise.reject({ message: error.message });
      }
   }
);

export default axiosClient;