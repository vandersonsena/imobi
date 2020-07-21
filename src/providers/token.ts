// util.ts
import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TokenProvider {
  
    private api_key: string;

    prepareHeader(headers: HttpHeaders | null): object {
        var val = localStorage.getItem('login-info');
        if (val != null){
          const key = JSON.parse(val);
          this.api_key = key.token;
        }else{
          this.api_key = "4j3qbuO5Da1nDzOINuLmfN0swGmAnUzugtbo/XhD1jw=";
        }  
        headers = headers || new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('imobi-api-key', this.api_key);
        return {
          headers: headers
        }
      }
}