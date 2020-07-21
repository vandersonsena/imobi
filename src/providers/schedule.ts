import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { TokenProvider } from './token';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()

export class ScheduleProvider {

  constructor(public http: HttpClient,
              private token: TokenProvider,
              private globals: Global) { }


  getSchedules(type: string, value: number, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/scheduler/' + type + '/' + value, expandedHeaders)
      .timeout(15000)
      .map(res => res.schedule);
  }

  saveSchedule(data: {broid: string, proid: string, reaid: string, usrid: string, eventdate: string}, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
        .post<any>(this.globals.getBaseUrl() + '/scheduler', data, expandedHeaders)
        .timeout(15000)
        .map(data => data);
    }







}
