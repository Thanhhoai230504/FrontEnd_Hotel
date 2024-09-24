import axiosClient from "../axiosClient";

interface User {
    email: string;
    password: string;
}
export const loginRequest =async(payload:User)=> {
    try {
        const response:any[] = await axiosClient.get("/users");
        const user = response.find((user) => user.email === payload.email && user.password === payload.password);
        if (user) {
            return user;
        }
        return null;
    } catch (error) {
        return null;
    }
    
}
