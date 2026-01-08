import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axiosInstance from "../api/axiosInstance";
import type { AxiosError, AxiosRequestConfig } from "axios";

export interface AxiosBaseQueryArgs {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers']
}

export const baseQuery: BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    unknown
> = async ({ url, method = "GET", data, params, headers }) => {
    try {
        const result = await axiosInstance({
            url: import.meta.env.BASE_URL + url,
            method,
            data,
            params,
            headers
        })
        return { data: result.data }
    } catch (error) {
        const err = error as AxiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}