import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estado } from '../models/estado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private URL: string = `${environment.apiUrl}/estado`;

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.URL}`);
  }
  
}
