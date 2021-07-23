import { LocalAppUrl } from "../../helpers/api-config";
import { ApiResponse } from "../../helpers/api-response";
import { HttpService } from "../http-service";



export class AuthService extends HttpService {

    async userLogin(payload: any): Promise<ApiResponse> {
        const response = await this.post(`${LocalAppUrl}/login`, payload);
        return response;
    }

    async register(payload: any): Promise<ApiResponse> {
        const response = await this.post(`${LocalAppUrl}/register`, payload);
        return response;
    }
}