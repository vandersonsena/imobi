import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { TokenProvider } from './token';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()

export class CategoriesProvider {
 
  constructor(public http: HttpClient, 
              private token: TokenProvider, 
              private globals: Global) { }

  get(headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/categories', expandedHeaders)
      .timeout(15000)
      .map(res => res.categories);
  }

  realestates(headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/realestates', expandedHeaders)
      .timeout(15000)
      .map(res => res.categories);
  }

}