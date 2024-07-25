import axios from "axios";
import { getSession, signOut } from "next-auth/react";

// export const BASE_URL = 'http://localhost:3001';
// export const BASE_URL = 'https://tlogo-be-nest.vercel.app';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const formDataApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

formDataApi.interceptors.request.use(async (config) => {
    const session = await getSession();

    config.headers.Authorization = `Bearer ${session?.user.accessToken}`;

    return config;
});

api.interceptors.request.use(async (config) => {
    const session = await getSession();

    config.headers.Authorization = `Bearer ${session?.user.accessToken}`;

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            signOut();
        }
        return Promise.reject(error);
    }
);

formDataApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            signOut();
        }
        return Promise.reject(error);
    }
);

export { api, formDataApi };
