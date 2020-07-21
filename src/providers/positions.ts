import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { TokenProvider } from './token';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()

export class PositionsProvider {
 
  constructor(public http: HttpClient, 
              private token: TokenProvider, 
              private globals: Global) { }

  getPositions(broid: string, latitude: any, longitude: any, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/position/broid/' + broid + '/' + latitude + '/' + longitude, expandedHeaders)
      .timeout(15000)
      .map(res => res);
  }

  getVisit(proid: any, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/visit/' + proid, expandedHeaders)
      .timeout(15000)
      .map(res => res.visits);
  }

  cancelVisit(broid: any, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .delete<any>(this.globals.getBaseUrl() + '/visit/' + broid, expandedHeaders)
      .timeout(15000)
      .map(res => res);
  }

  brokerPosition(data: {broid: number, latitude: any, longitude: any}, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .post<any>(this.globals.getBaseUrl() + '/broker/position', data, expandedHeaders)
      .timeout(15000)
      .map(data => data);
  }
}