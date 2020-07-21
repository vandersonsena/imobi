import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { TokenProvider } from './token';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()

export class PropertyProvider {
 
  constructor(public http: HttpClient, 
              private token: TokenProvider, 
              private globals: Global) { }

 
  getHighlights(filter?: any, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    if (filter)
    {
      return this.http
      .post<any>(this.globals.getBaseUrl() + '/highlights', filter, expandedHeaders)
      .timeout(15000)
      .map(res => res.filters);
    }
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/highlights', expandedHeaders)
      .timeout(15000)
      .map(res => res.highlights);
  }

  getSearchedNeighboors(neighboor: string, city: string, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/search-neighboors/' + neighboor + '/' + city, expandedHeaders)
      .timeout(15000)
      .map(res => res);
  }
  
  listProperty(reaid: number, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/property/reaid/' + reaid, expandedHeaders)
      .timeout(15000)
      .map(res => res.property);
  }

  getProperty(proid: string, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/property/' + proid, expandedHeaders)
      .timeout(15000)
      .map(res => res.property);
  }

  getNeighboors(match: string, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/neighboors/' + match, expandedHeaders)
      .timeout(15000)
      .map(res => res);
  }

  save(reg, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .post<any>(this.globals.getBaseUrl() + '/property', reg, expandedHeaders)
      .timeout(15000)
      .map(res => res);
  }

  status(reg, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    return this.http
      .put<any>(this.globals.getBaseUrl() + '/property-status', reg, expandedHeaders)
      .timeout(15000)
      .map(res => res);
  }

  getDiscover(coordinate: any, headers?: HttpHeaders): Observable<any> {
    const expandedHeaders = this.token.prepareHeader(headers);
    var urlParam = (coordinate !== null ? coordinate.latitude + "/" + coordinate.longitude : "0/0");
    return this.http
      .get<any>(this.globals.getBaseUrl() + '/discover/' + urlParam, expandedHeaders)
      .timeout(15000)
      .map(res => res.features);
  }



  

}