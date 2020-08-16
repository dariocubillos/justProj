import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConstAPI } from '../const/const-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAppService {
  [x: string]: any;

  constructor(private httpClient: HttpClient
  ) { }

  registeruser(user:string, pass:string, name:string , phone:number): Observable<any>{

    let paramsx = new HttpParams();

    // Begin assigning parameters
    paramsx = paramsx.append('user', user);
    paramsx = paramsx.append('password',pass);
    paramsx = paramsx.append('name', name);
    paramsx = paramsx.append('phone', name);

    this.httpClient

    // Make the API call using the new parameters.
    return this.httpClient.post<any>(`${ConstAPI.API_ENDPOINT}/registeruser.php`,paramsx);

  }


}
