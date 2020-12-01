import { Component, OnInit } from '@angular/core';
import { UserService, User, Login } from '../swagger';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  datasource = [];
  displayedColumns = ['id', 'name', 'login', 'buttonAlterar', 'buttonDeletar'];

  user: User = <User>{}
  login: Login = <Login>{};
  get loged(): boolean {
    return this.auth.bearer ? true : false;
  }
  public constructor(private uUseService: UserService, private auth: AuthService) {
  }

  public get titulo(): string {
    return 'Amigos';
  }

  ngOnInit() {
    this.GetAllUser();
  }


  public GetAllUser() {
    this.uUseService.apiUserGetAllUserGet().toPromise().then((result) => {
      this.datasource = result;
    }).catch(() => {
    });

  }

  public Gravar() {
    if (this.user.id) {
      if (this.loged) {
        this.uUseService.apiUserUpdateUserPut(this.user).toPromise().then(() => {
          this.Clean();
          alert("Amigo alterado!!");

        }).catch(() => {
          alert("Favor verifique o cadastro");
        });
      } else {
        alert("Favor fazer o login");
      }

    } else {

      this.uUseService.apiUserCreatePost(this.user).toPromise().then(() => {
        this.Clean();
        alert("Amigo inserido!!");

      }).catch(() => {
        alert("Favor verifique o cadastro");
      });

    }
  }

  public Alterar(id) {
    if (this.loged) {
      this.uUseService.apiUserGetByIdUserGet(id).toPromise().then((result) => {
        this.user = result;
      }).catch(() => {
        alert("Favor verifique o cadastro")
      });
    } else {
      alert("Favor fazer o login");
    }
  }

  public Deletar(id) {
    if (this.loged) {
      this.uUseService.apiUserDeleteUserDelete(id).toPromise().then(() => {
        this.Clean();
        alert("Amigo deletado!!")
      }).catch(() => {
        alert("Favor verifique o cadastro")
      });
    } else {
      alert("Favor fazer o login");
    }
  }

  public Clean() {

    this.user = <User>{};
    this.GetAllUser();
  }
}

