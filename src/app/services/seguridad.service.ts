import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  private URL: string = `${environment.apiUrl}/seguridad`;

  constructor(private http: HttpClient) { }

  validarCodigo(codigo: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('codigo', codigo);
    return this.http.get<any>(`${this.URL}/validar`, { params });
  }

  generarCodigo(pwd: string): Observable<string> {
    let params = new HttpParams();
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${pwd}`
    });
    let body = { pwd: pwd };
    
    // Indicar a Angular que la respuesta es de tipo texto
    return this.http.post<string>(this.URL, body, { headers, responseType: 'text' as 'json' });
  }
}
