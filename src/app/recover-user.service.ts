import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDTO} from "../models/userDTO.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecoverUserService {

  constructor(public httpClient: HttpClient) { }

    loadUserES(user: UserDTO): Observable<Object> {

     return this.httpClient
             .get("http://localhost:8082/api/recoverUser"
      +"?fullName="+user.fullName+"&nif="+user.nif);
    }


}
