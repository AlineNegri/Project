import { Component, OnInit } from '@angular/core';
import { GameService, Game } from '../swagger';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  datasource = [];
  displayedColumns = ['id', 'name', 'buttonAlterar', 'buttonDeletar'];

  game: Game = <Game>{}
  public constructor(private gGameService: GameService) {
  }

  public get titulo(): string {
    return 'Jogos';
  }

  ngOnInit() {
    this.GetAllUser();
  }


  public GetAllUser() {
    this.gGameService.apiGameGetAllGameGet().toPromise().then((result) => {
      this.datasource = result;
    }).catch(() => {
    });

  }

  public Gravar() {
    if (this.game.id) {
      this.gGameService.apiGameUpdateGamePut(this.game).toPromise().then(() => {
        this.Clean();
      }).catch(() => {
        alert("Favor verifique o cadastro");
      });

    } else {

      this.gGameService.apiGameCreateGamePost(this.game).toPromise().then(() => {
        this.Clean();
        alert("Jogo inserido!!");

      }).catch(() => {
        alert("Favor verifique o cadastro");
      });

    }
  }

  public Alterar(id) {
    this.gGameService.apiGameGetByIdGameGet(id).toPromise().then((result) => {
      this.game = result;
    }).catch(() => {
      alert("Favor verifique o cadastro")
    });
  }

  public Deletar(id) {

    this.gGameService.apiGameDeleteGameDelete(id).toPromise().then(() => {
      this.Clean();
      alert("Jogo deletado!!")
    }).catch(() => {
      alert("Favor verifique o cadastro")
    });
  }

  public Clean() {

    this.game = <Game>{};
    this.GetAllUser();
  }
}

