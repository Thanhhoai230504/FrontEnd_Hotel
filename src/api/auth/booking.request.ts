import axiosClient from "../axiosClient";

const API = axiosClient;
export const bookingRequest = async (values: any) => {
  try {
    const response: any = await API.post("/bookings", values);
    return response;
  } catch (error: any) {
    console.error("Signup error:", error);
    return null;
  }
};
