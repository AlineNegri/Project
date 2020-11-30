export * from './game.service';
import { GameService } from './game.service';
export * from './login.service';
import { LoginService } from './login.service';
export * from './user.service';
import { UserService } from './user.service';
export * from './userGame.service';
import { UserGameService } from './userGame.service';
export const APIS = [GameService, LoginService, UserService, UserGameService];
