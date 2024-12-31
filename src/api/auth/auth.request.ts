import axiosClient from "../axiosClient";

const API = axiosClient;

export const loginRequest = async (values: any) => {
  try {
    const response:any = await API.post("/auth/login", values);


    
    if (response?.success) { 
      console.log("Login successful:", response); 
      return {
        token: response.token,  
        user: response.user,    
      };
    }
    console.log("Login failed: No success in response");
    return null;
    
  } catch (error: any) {
  
    console.error("Login error:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    return null;
  }
};


export const signupRequest = async (values: any) => {
  try {
    const response: any = await API.post("/auth/register", values);
    return response;
  } catch (error: any) {
    console.error("Signup error:", error);
    return null;
  }
};
