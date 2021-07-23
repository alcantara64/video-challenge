
import axios, { AxiosInstance } from "axios";
import { AxiosRequestConfig } from "axios";
import queryString from "query-string";
import { ApiConfig, DEFAULT_API_CONFIG } from "../../helpers/api-config";
import { processErrorResponse } from "../../helpers/api-problem";
import { ApiResponse } from "../../helpers/api-response";

export class HttpService {
    /**
     * The underlying  instance which performs the requests.
     */
    private httpInstance: AxiosInstance | undefined;

    private config: ApiConfig;

    constructor(
        headers?: any,
        responseInterceptors?: any[],
        requestInterceptors?: any[],
        config: ApiConfig = DEFAULT_API_CONFIG
    ) {
        this.config = config;

        const axioConfig: AxiosRequestConfig = {
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: "application/json",
            },
        };

        if (headers) {
            axioConfig.headers = { ...axioConfig.headers, ...headers };
        }

        this.httpInstance = axios.create(axioConfig);

        responseInterceptors?.map((interceptor) =>
            this.httpInstance?.interceptors.response.use(interceptor)
        );

        requestInterceptors?.map((interceptor) =>
            this.httpInstance?.interceptors.request.use(interceptor)
        );
    }

    protected async get(
        url: string,
        payload?: any,
        options?: AxiosRequestConfig
    ): Promise<ApiResponse> {
        let query = "";

        let response: ApiResponse;

        if (payload) {
            query = `?q=${queryString.stringify(payload)}`;
        }

        try {
            const result = await this.httpInstance?.get(`${url}${query}`, options);

            response = new ApiResponse("ok", result?.statusText, result?.data);
        } catch (ex) {
            response = processErrorResponse(ex);
        }

        return response;
    }

    async post(
        url: string,
        payload?: any,
        options?: AxiosRequestConfig
    ): Promise<ApiResponse> {
        let response: ApiResponse;

        try {
            const result: any = await this.httpInstance?.post(
                `${url}`,
                payload,
                options
            );
            // console.log("newold "+result)

            response = new ApiResponse("ok", result?.statusText, result?.data);
        } catch (ex) {
            response = processErrorResponse(ex);
        }

        return response;
    }
    async put(
        url: string,
        payload?: any,
        options?: AxiosRequestConfig
    ): Promise<ApiResponse> {
        let response: ApiResponse;

        try {
            const result: any = await this.httpInstance?.put(
                `${url}`,
                payload,
                options
            );
            // console.log("newold "+result)

            response = new ApiResponse("ok", result?.statusText, result?.data);
        } catch (ex) {
            response = processErrorResponse(ex);
        }

        return response;
    }
    async delete(
        url: string,
        options?: AxiosRequestConfig
    ): Promise<ApiResponse> {
        let response: ApiResponse;

        try {
            const result: any = await this.httpInstance?.delete(
                `${url}`,
                options
            );
            // console.log("newold "+result)

            response = new ApiResponse("ok", result?.statusText, result?.data);
        } catch (ex) {
            console.log('error==>', ex)
            response = processErrorResponse(ex);
        }

        return response;
    }
}
