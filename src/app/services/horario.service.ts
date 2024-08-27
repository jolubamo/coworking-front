import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuscarHorasDisponiblesDto } from '../models/buscar-horas-disponibles-dto';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private URL: string = `${environment.apiUrl}/horario`;

  constructor(private http: HttpClient) { }

crearSinArchivo(json: BuscarHorasDisponiblesDto): Observable<Horario[]> {
  let formData: FormData = new FormData();
  formData.set('json', JSON.stringify(json));
  return this.http.post<Horario[]>(`${this.URL}/horarios-disponibles`, formData);
}
getHorarios(): Observable<Horario[]> {
  return this.http.get<Horario[]>(`${this.URL}`);
}
}
