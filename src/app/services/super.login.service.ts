import { Observable } from "rxjs";
import { SocialUser } from "angularx-social-login";
import { TipoLogin } from "../enum/tipo-login";


export interface SuperLoginService {
    
    loginGoogle(object): Promise<SocialUser>;

    loginPadrao(object, tipoLogin): Observable<any>;  

}