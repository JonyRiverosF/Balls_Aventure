import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private urlApi='https://www.feriadosapp.com/api/laws.json';

  private apiurl='https://api.rawg.io/api';
  
  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get(this.urlApi);
  }

  getGameDetails(slug: string): Observable<any> {
    const apiKey = 'f16ba67e2bed4140bb6c51be557f9ad7'; 
    const url = `${this.apiurl}/games/${slug}?key=${apiKey}`;
    return this.http.get(url);
  }

  // Método para obtener la lista de juegos
  getListaDeJuegos(): Observable<any> {
    const apiKey = 'f16ba67e2bed4140bb6c51be557f9ad7'; 
    const url = `${this.apiurl}/games?key=${apiKey}`;
    return this.http.get(url);
  }

  

  
}
