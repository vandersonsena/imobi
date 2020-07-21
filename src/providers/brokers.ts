import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { TokenProvider } from './token';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()

export class BrokersProvider {
 
  constructor(public http: HttpClient, 
              private token: TokenProvider, 
              private globals: Global) { }

    callBroker(data: {broid: number, proid: number, reaid: number}, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
        .post<any>(this.globals.getBaseUrl() + '/broker/call', data, expandedHeaders)
        .timeout(15000)
        .map(data => data);
    }

    saveBrokerIncoming(data: {broid: number, proid: number, reaid: number, usrid: number, status: number}, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
        .put<any>(this.globals.getBaseUrl() + '/broker/incoming', data, expandedHeaders)
        .timeout(15000)
        .map(data => data);
    }       
            
    statusBroker(reg: {status: number}, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
        .put<any>(this.globals.getBaseUrl() + '/broker/status', reg, expandedHeaders)
        .timeout(15000)
        .map(data => data);
    }

    nearBrokers(coords: {latitude: any, longitude: any}, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
        .post<any>(this.globals.getBaseUrl() + '/brokers/near', coords, expandedHeaders)
        .timeout(15000)
        .map(data => data);
    }
            
  }