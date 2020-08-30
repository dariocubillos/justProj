import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConstAPI } from '../const/const-api';
import { Observable } from 'rxjs';
import {Just} from '../models/just';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginAppService {
  [x: string]: any;

  constructor(private httpClient: HttpClient
  ) { }

  registerUser(user:string, pass:string, name:string , phone:number, typeUser:string): Observable<any>{

    let paramsx = new HttpParams();

    // Begin assigning parameters
    paramsx = paramsx.append('user', user);
    paramsx = paramsx.append('password',pass);
    paramsx = paramsx.append('name', name);
    paramsx = paramsx.append('phone', phone.toString());
    paramsx = paramsx.append('typeUser', typeUser);


    // Make the API call using the new parameters.
    return this.httpClient.post<any>(`${ConstAPI.API_ENDPOINT}/registeruser.php`,paramsx);

  }

  checkUser(userName:string, pass:string){
    let paramsx = new HttpParams();

    // Begin assigning parameters
    paramsx = paramsx.append('user', userName);
    paramsx = paramsx.append('password',pass);

    return this.httpClient.post<any>(`${ConstAPI.API_ENDPOINT}/checkuser.php`,paramsx);
  }

  checkUserTeacher(userid:number){
    let paramsx = new HttpParams();

    // Begin assigning parameters
    paramsx = paramsx.append('userid', userid.toString());

    return this.httpClient.post<any>(`${ConstAPI.API_ENDPOINT}/checkuserid.php`,paramsx);
  }

  updateJust(justId:number, state:string){
    
    let paramsx = new HttpParams();

    // Begin assigning parameters
    paramsx = paramsx.append('justId', justId.toString());
    paramsx = paramsx.append('state', state);
    console.log(paramsx);

    return this.httpClient.post<any>(`${ConstAPI.API_ENDPOINT}/updatejust.php`,paramsx);
  }

  saveImage(myFiles:string[]){
    const formData =  new  FormData();

    for  (var i =  0; i < myFiles.length; i++)  {  
        formData.append("file[]", myFiles[i]);
    } 
    return this.httpClient.post<any>(`${ConstAPI.API_ENDPOINT}/savefile.php`, formData);
  }

  saveRecord(filename:string,username:number, dateStart:string ,
            dateEnd:string, reason:string, info:string, teacher:number){
    let paramsx = new HttpParams();
    // Begin assigning parameters
    paramsx = paramsx.append('user', username.toString());
    paramsx = paramsx.append('dateStart',dateStart);
    paramsx = paramsx.append('dateEnd',dateEnd);
    paramsx = paramsx.append('reason',reason);
    paramsx = paramsx.append('info',info);
    paramsx = paramsx.append('filename', filename);
    paramsx = paramsx.append('teacher', teacher.toString());

    return this.httpClient.post<any>(`${ConstAPI.API_ENDPOINT}/savejust.php`,paramsx);

  }

  getRecords(userFk:number){
    let paramsx = new HttpParams();
    // Begin assigning parameters
    paramsx = paramsx.append('user', userFk.toString());
    return this.httpClient.post<Array<Just>>(`${ConstAPI.API_ENDPOINT}/checkjust.php`,paramsx);
  }

  getRecordsToTeacher(userFk:number){
    let paramsx = new HttpParams();
    // Begin assigning parameters
    paramsx = paramsx.append('user', userFk.toString());
    return this.httpClient.post<Array<Just>>(`${ConstAPI.API_ENDPOINT}/checkjusttoteacher.php`,paramsx);
  }

  getTeachers(){
    return this.httpClient.post<Array<User>>(`${ConstAPI.API_ENDPOINT}/getteachers.php`,null);
  }

}
