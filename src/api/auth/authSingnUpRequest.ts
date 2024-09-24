import axiosClient from "../axiosClient";

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
    confirmPassword: string;
    marketingConsent: boolean;
    profilingConsent: boolean;
}
export const SingnUpRequest = async (payload: User) => {
    try {
        const response: any[] = await axiosClient.get("/users");
        const userExists = response.find((user) => 
            user.email === payload.email || user.userName === payload.userName
        );
        return !userExists; // Trả về true nếu không tồn tại người dùng nào
    } catch (error) {
        return null;
    }
}
