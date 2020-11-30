import { Component, OnInit, Injector, KeyValueDiffers } from '@angular/core';
import { User, Configuration, ApiModule, LoginService, UserService, Login } from '../swagger';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = <Login>{}
  public constructor(private auth: AuthService, private router: Router) {
  }

  public get titulo(): string {
    return 'Usuário';
  }

  ngOnInit() {
  }


  public Login() {
    this.auth.Login(this.user).then((result) => {
      if (result) {
        this.router.navigate(['menu']);
      } else {
        alert("Login incorreto");
      }
    });
  }
 public Create() {
        this.router.navigate(['create-user']);
  }

}
