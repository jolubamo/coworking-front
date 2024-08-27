import { Injectable } from '@angular/core';
import { TipoSala } from '../models/tipo-sala';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoSalaService {

  private URL: string = `${environment.apiUrl}/tipo-sala`;

  constructor(private http: HttpClient) { }
  
    getSalas(): Observable<TipoSala[]> {
      return this.http.get<TipoSala[]>(`${this.URL}`);
    }

}
