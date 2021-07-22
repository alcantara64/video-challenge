import { ApiResponse } from "../../helpers/api-response";
import { HttpService } from "../http-service";



export class AuthService extends HttpService {

    async userLogin(payload: any): Promise<ApiResponse> {
        const response = await this.post("/user/sign_in", payload);
        return response;
    }

    async register(payload: any): Promise<ApiResponse> {
        const response = await this.post("/user/register", payload);
        return response;
    }
}