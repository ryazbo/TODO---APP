import axios, { AxiosRequestConfig } from "axios";

const headers = {
  "Content-Type": "application/json;charset=utf-8",
};

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
      headers,
      params,
    };
    return await makeRequest<T>(config);
  };
  
  const post = async <T>(url: string, body: any) => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url,
      headers,
      data: body,
    };
    return await makeRequest<T>(config);
  };
  
  const put = async <T>(url: string, body: any) => {
    const config: AxiosRequestConfig = {
      method: "PUT",
      url,
      headers,
      data: body,
    };
    return await makeRequest<T>(config);
  };
  
  const _delete = async <T>(url: string) => {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url,
      headers,
    };
    return await makeRequest<T>(config);
  };
  
  export const http = {
    get,
    post,
    put,
    delete: _delete,
  };
  