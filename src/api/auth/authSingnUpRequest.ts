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
        const response: User[] = await axiosClient.get("/users");
        const userExists = response.find((user) => 
            user.email === payload.email || user.userName === payload.userName
        );
        return !userExists; //có trả về true k có trả về false
    } catch (error) {
        return null;
    }
}
