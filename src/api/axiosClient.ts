import axios from "axios";

const axiosClient = axios.create({
   baseURL: "https://api-project-wheat-six.vercel.app",
   timeout: 10000,
});

// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(
   function (config) {
      // Làm gì đó trước khi request được gửi đi
      return config;
   },
   function (error) {
      // Làm gì đó với lỗi request
      return Promise.reject(error);
   }
);

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
   function (response) {
      // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
      return response.data;
   },
   function (error) {
      // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger
      return Promise.reject(error?.message);
   }
);

export default axiosClient;