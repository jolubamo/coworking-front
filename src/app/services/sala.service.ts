import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sala } from '../models/sala';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private URL: string = `${environment.apiUrl}/sala`;

  constructor(private http: HttpClient) { }

  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.URL}`);
  }
  getSalasActivas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.URL}/activas`);
  }
  getSalasPorTipoSala(idTipoSala: number): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.URL}/tipo-sala/${idTipoSala}`);
  }
  getSalasPorCapacidad(capacidad: number): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.URL}/capacidad/${capacidad}`);
  }
  getSalasPorTipoSalaCapacidad(idTipoSala: number, capacidad: number): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.URL}/tipo-sala-capacidad/${idTipoSala}/${capacidad}`);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
  modificar(sala: Sala): Observable<Sala> {
    return this.http.put<Sala>(this.URL, sala);
  }

  crear(sala: Sala): Observable<void> {
    return this.http.post<void>(`${this.URL}`, sala);
  }

}
