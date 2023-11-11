import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi='https://www.feriadosapp.com/api/laws.json';
  
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.urlApi).pipe(
    retry(3)
    );}
  

  
}
