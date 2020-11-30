import { Component, OnInit } from '@angular/core';
import { UserService, User, Login, UserGameService, UserGame } from '../swagger';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-user-game',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.css']
})
export class UserGameComponent implements OnInit {

  datasource = [];
  users = [];
  games = [];
  displayedColumns = ['id', 'nameUser', 'nameGame', 'buttonAlterar', 'buttonDeletar'];

  userGame: UserGame = <UserGame>{}
  login: Login = <Login>{};
  loged: boolean = false;
  public constructor(private uUseGameService: UserGameService, private auth: AuthService) {
  }

  public get titulo(): string {
    return 'Amigos';
  }

  ngOnInit() {
    this.GetAllUserGame();
    this.GetAllUser();
    this.GetAllGame();
  }


  public GetAllUser() {
    this.uUseGameService.apiUserGameGetAllUserGet().toPromise().then((result) => {
      this.users = result;
    }).catch(() => {
    });

  }

  public GetAllGame() {
    this.uUseGameService.apiUserGameGetAllGameGet().toPromise().then((result) => {
      this.games = result;
    }).catch(() => {
    });

  }

  public GetAllUserGame() {
    this.uUseGameService.apiUserGameGetAllUserGameGet().toPromise().then((result) => {
      this.datasource = result;
    }).catch(() => {
    });

  }
  public Gravar() {
    if (this.userGame.id) {
      this.uUseGameService.apiUserGameUpdateUserGamePut(this.userGame).toPromise().then(() => {
        this.Clean();
        alert("Emprestimo alterado!!");

      }).catch(() => {
        alert("Favor verifique o cadastro");
      });
    } else {

      this.uUseGameService.apiUserGameCreateUserGamePost(this.userGame).toPromise().then(() => {
        this.Clean();
        alert("Emprestimo inserido!!");

      }).catch(() => {
        alert("Favor verifique o cadastro");
      });

    }
  }

  public Alterar(id) {
      this.uUseGameService.apiUserGameGetByIdUserGameGet(id).toPromise().then((result) => {
        this.userGame = result;
      }).catch(() => {
        alert("Favor verifique o cadastro")
      });
  }

  public Deletar(id) {

      this.uUseGameService.apiUserGameDeleteUserGameDelete(id).toPromise().then(() => {
        this.Clean();
        alert("Emprestimo deletado!!")
      }).catch(() => {
        alert("Favor verifique o cadastro")
      });
  }

  public Clean() {

    this.userGame = <UserGame>{};
    this.GetAllUserGame();
  }
}

