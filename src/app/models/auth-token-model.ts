export default class AuthToken {
  access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    cif: string;
    generated_time: number;
    jti: string;
    error: string;
    error_description: string;

    constructor(){
      
    }
}