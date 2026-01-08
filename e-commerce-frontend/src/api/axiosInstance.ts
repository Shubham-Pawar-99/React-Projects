import axios, { AxiosError } from "axios";
import { getToken } from "../util/token";

const axiosInstance = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

// attech token 
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

//intercept response to handle error
axiosInstance.interceptors.response.use(
    (res) => res,
    async (err: AxiosError) => {
        console.log("Axios Error", err)
        return Promise.reject(err);
    }
)

export default axiosInstance;