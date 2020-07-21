import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { TokenProvider } from './token';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()

export class SignupProvider {
 
  constructor(public http: HttpClient, 
              private token: TokenProvider, 
              private globals: Global) { }

  save(register, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .post<any>(this.globals.getBaseUrl() + '/signup', register, expandedHeaders)
      .timeout(15000)
      .map(res => {
          localStorage.setItem('usr-avatar', res.selfie);
          localStorage.setItem('usr-email', res.email);
          localStorage.setItem('usr-type', res.type);
          localStorage.setItem('usr-usrid', res.usrid);
          localStorage.setItem('usr-active', res.active);
          localStorage.setItem('usr-name', res.name);
          localStorage.setItem('reduce-user', res.name.split(" ", 1));
          localStorage.setItem('logged', res.logged);
          localStorage.setItem('login-info', JSON.stringify(res));
      });
  }

  update(register, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .put<any>(this.globals.getBaseUrl() + '/signup', register, expandedHeaders)
      .timeout(15000)
      .map(res => {
          localStorage.setItem('usr-name', res.name);
          localStorage.setItem('usr-type', res.usrid);
          localStorage.setItem('usr-usrid', res.usrid);
          localStorage.setItem('usr-active', res.active);
          localStorage.setItem('reduce-name', res.name.split(" ", 1));
          localStorage.setItem('logged', res.logged);
          localStorage.setItem('login-info', JSON.stringify(res));
      });
  }

  

  

}