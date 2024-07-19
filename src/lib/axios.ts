import axios from "axios";

// export const BASE_URL = 'http://localhost:3001';
// export const BASE_URL = 'https://tlogo-be-nest.vercel.app';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
