import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiModule, Configuration } from './swagger';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatAutocompleteModule,

} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { GameComponent } from './game/game.component';
import { UserGameComponent } from './user-game/user-game.component';
import { InterceptorService } from './http-interceptor/interceptor.service';
import { AuthService } from './login/auth.service';
import { NoLogedGuardGuard } from './guards/no-loged-guard.guard';
import { LogedGuardGuard } from './guards/loged-guard.guard';

export function configureApi() {
  return new Configuration({
    basePath: "."
  });
}

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginComponent,
    MenuComponent,
    GameComponent,
    UserGameComponent
  ],
  exports: [
    MenuComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule.forRoot(configureApi),
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatAutocompleteModule,
    NoopAnimationsModule,
    LayoutModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [NoLogedGuardGuard] },
      { path: 'menu', component: MenuComponent, pathMatch: 'full', canActivate: [LogedGuardGuard] },
      { path: 'create-user', component: CreateUserComponent, pathMatch: 'full' },
      { path: 'game', component: GameComponent, pathMatch: 'full', canActivate: [LogedGuardGuard] },
      { path: 'user-game', component: UserGameComponent, pathMatch: 'full', canActivate: [LogedGuardGuard] },
      { path: '**', redirectTo: '/login' }
    ]),
  ],
  providers: [
    AuthService,
    NoLogedGuardGuard,
    LogedGuardGuard,
    InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
