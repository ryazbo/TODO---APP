/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';


const makeRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await axios(config);
        return response.data as T;
    } catch (error: any) {
        if (error && typeof error === "object" && "response" in error) {
            throw (error as { response: { data: T } }).response.data;
        } else {
            throw (error as Error)?.message || "An unexpected error occurred.";
        }
    }
};


const get = async <T>(url: string, params: Object = {}) => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url,
        params,
    };
    return await makeRequest<T>(config);
};

export const http = {
    get
};