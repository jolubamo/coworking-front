import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva';
import { ReservaDto } from '../models/reserva-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
private URL: string = `${environment.apiUrl}/reserva`;

constructor(private http: HttpClient) { }

  getReserva(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.URL}`);
  }
  
  getReservaPorSala(id: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.URL}/sala/${id}`);
  }

  getReservaPorUsuario(documento: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.URL}/usuario/${documento}`);
  }

  crear(reserva: ReservaDto): Observable<void> {
    return this.http.post<void>(`${this.URL}`, reserva);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
