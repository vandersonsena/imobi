import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { TokenProvider } from './token';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class WaitinglistProvider {

  //public URL_PORTAL = 'https://autocarx.com.br/imobi_app/';
  public URL_PORTAL = 'https://clinicaorel.com.br/portal-app/';

  private API_URL = this.URL_PORTAL+'api/ws.php';

  constructor(public http: HttpClient) { }

  register(data, type): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers':
          'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };

    let form = '';

    if(type == 1) {
      form = 'form1';
    }
    else if(type == 2) {
      form = 'form2';
    }
    else if(type == 3) {
      form = 'form3';
    }
    else if(type == 4) {
      form = 'form4';
    }

    return this.http
        .post<any>(this.API_URL + '?action='+form, data, {
          headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
        })
        .timeout(15000)
        .map(data => data);
  }


}

