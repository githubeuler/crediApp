import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient)

  private apiUrl = environment.ApiUrl + '/account'

  constructor() { }

  Auth(usuario :string,contrasena :string,codigo :string,origen:string): Observable<Response> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 
      usuario,
      contrasena,
      codigo,
      origen
     };
    return this.http.post<Response>(this.apiUrl + '/auth', body, { headers });
  }
}
