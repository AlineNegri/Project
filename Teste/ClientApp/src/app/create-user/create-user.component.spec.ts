import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { Spectator } from '@ngneat/spectator';
import { CreateUserComponent } from './create-user.component';
import { UserService, ApiModule, User } from '../swagger';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
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
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { BrowserModule } from '@angular/platform-browser';
import { of, throwError, defer } from 'rxjs';


describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  // let spectator: Spectator<CadastroUsuariosComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
        BrowserModule,
        HttpClientModule,
        ApiModule,
        RouterModule,
        AppModule,
      ],
      declarations: [],
      providers:[]
    });
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance; // BannerComponent test instance
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should display original title', () => {
    expect(h1.textContent).toContain(component.titulo);
  });


  it('no title in the DOM after createComponent()', () => {
    expect(h1.textContent).toEqual('Amigos');
  });
});

describe('UserService', () => {
  let httpClientSpy: { request: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['request']);
    TestBed.configureTestingModule({
      imports: [
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
        BrowserModule,
        HttpClientModule,
        ApiModule,
        RouterModule,
        AppModule,
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should retornar the user #1', () => {
    const service: UserService = TestBed.get(UserService);

    const usuario = <User> {
      id: 1,
      name: 'Teste',
      login: "teste",
      password: "123456"
    }
    
    httpClientSpy.request.and.returnValue(of(usuario));

    const retorno = service.apiUserGetByIdUserGet(null);


    service.apiUserGetByIdUserGet(1).subscribe(
      usuarioRet => expect(usuarioRet).toEqual(usuario, "não retornou o usuário"),
      fail
    );

  });

  it('should retornar null when name null', () => {
    const service: UserService = TestBed.get(UserService);

    httpClientSpy.request.and.returnValue(of(null));

    const retorno = service.apiUserGetByIdUserGet(null);
    

    service.apiUserGetByIdUserGet(null).subscribe(
      usuario => expect(usuario).toBeNull(), // , 'O retorno não foi null');,
      fail
    );

  });

  it('should return an error when the server returns a 404', () => {
    const service: UserService = TestBed.get(UserService);

    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.request.and.returnValue(throwError(errorResponse));


    service.apiUserGetByIdUserGet(2).subscribe(
      usuarios => fail('expected an error, not users'),
      error => expect(error.message).toContain('404')
    );
  });
});

