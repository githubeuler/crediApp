import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private http = inject(HttpClient)

  // private apiUrl = 'https://localhost:7283/api/v1/General';
  private apiUrl = environment.ApiUrl + '/general'

  constructor() { }

  getCombo(tipo: string, filtro: string) {
    return this.http.get<Response>(this.apiUrl + '/combo/' + tipo + '/' + filtro)
  }

  getPreLiquidacion(idRuta: number) {
    return this.http.get<Response>(this.apiUrl + '/preliquidacion/' + idRuta)
  }

  getCierre(idRuta: number,fecha:string) : Observable<Response> {
    console.log('cierre')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      idRuta,
      fecha
    }
    return this.http.post<Response>(this.apiUrl + '/cierre',body, { headers })
  }
}
