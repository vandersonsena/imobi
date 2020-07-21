import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { TokenProvider } from './token';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class LoginProvider {
 
  constructor(public http: HttpClient, 
              private token: TokenProvider, 
              private globals: Global) { }

  login(credentials: {user: string, pwd: string}, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .post<any>(this.globals.getBaseUrl() + '/login', credentials, expandedHeaders)
      .timeout(15000)
      .map(res => res);
  }

  remember(email: string, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/remember/' + email, expandedHeaders)
      .timeout(15000)
      .map(data => data.code);
  }

  savepassword(pass: {user: string, pwd: string}, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .put<any>(this.globals.getBaseUrl() + '/savepassword', pass, expandedHeaders)
      .timeout(15000)
      .map(data => data.password);
  }

  userinfo(headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http.get<any>(this.globals.getBaseUrl() + '/user-info', expandedHeaders)
      .timeout(30000)
      .map(data => data.userinfo[0]);
  }

  logout(): Observable<any> {
    return this.http
      .get(this.globals.getBaseUrl() + '/logout')
      .timeout(15000)
      .do(data => {});
  }

}