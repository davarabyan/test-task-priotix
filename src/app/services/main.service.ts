import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Icat } from '../interfaces/Icat.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.api-ninjas.com/v1/cats?name=';
  constructor(private http: HttpClient) { }


  getbreeds(name: string): Observable<Icat[]> {
    return  this.http.get<Icat[]>(this.apiUrl + name) 
  }
}
