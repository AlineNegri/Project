import { async, ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
//import { Spectator } from '@ngneat/spectator';
import { CreateUserComponent } from './create-user.component';
import { UserService, ApiModule } from '../swagger';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forwardRef } from '@angular/core';
import { throwError } from 'rxjs';
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


describe('CadastroUsuariosComponent', () => {
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
        ApiModule,
        RouterModule,
      ],
      declarations: [CreateUserComponent],
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
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
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
        ApiModule,
        RouterModule,
        AppModule,
      ],
      providers: [
        { provide: HttpClient, useExisting: forwardRef(() => httpClientSpy) },
      ]
    });
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should retornar null when name null', () => {
    const service: UserService = TestBed.get(UserService);

    const retorno = service.apiUserGetByIdUserGet(null);
    expect(retorno).toBeNull(); // , 'O retorno não foi null');
  });

  it('should retornar null when 404', () => {
    const service: UserService = TestBed.get(UserService);

    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    const retorno = service.apiUserGetByIdUserGet(1);
    expect(retorno).toBeNull(); //, 'O retorno não foi null');
  });
});

