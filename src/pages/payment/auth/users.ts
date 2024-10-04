import { axiosInstance } from "../../../data/api.tsx";
import { AxiosError } from 'axios';

interface UserPayload {
    email: string;
    password: string;
    // Add other fields if necessary
}

interface RegisterPayload {
    name: string;
    password: string;
    email: string;
}

export const LoginUser = async (payload: UserPayload) => {
    try {
        const { data } = await axiosInstance.post('/login', payload);
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return error.response.data;
        }
        throw error; // Optional: rethrow if it's not a standard error
    }
};

export const RegisterUser = async (payload: RegisterPayload) => {
    try {
        const { data } = await axiosInstance.post('/register', payload);
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const GetUserInfo = async () => {
    try {
        const { data } = await axiosInstance.post("/get-user-info");
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return error.response.data;
        }
        throw error;
    }
};
