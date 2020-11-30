import { Injectable } from '@angular/core';
import { User, LoginService, Login } from '../swagger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private $bearer: string;
  public get bearer(): string {
    return this.$bearer;
  }

  constructor(private uUseService: LoginService) {

  }

  public Login(user: Login): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.uUseService.apiLoginLoginPost(user).toPromise().then((result) => {
        if (result != null) {
          this.$bearer = result.token;
          resolve(true);
        } else {
          resolve(false);
        }
 
        
      }).catch(reject);
    });
  }
}
