import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private http = inject(HttpClient)

  // private apiUrl = 'https://localhost:7283/api/v1/gasto';
  private apiUrl = environment.ApiUrl + '/gasto'

  getGastosRuta(idRuta :  number) {
    return this.http.get<Response>(this.apiUrl + '/gastoRuta/' + idRuta)
  }

  insertaGastoRuta(idRuta: number,idGasto: number,monto: number | undefined,concepto: string,usuarioCreacion: number,estado : boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      idRuta,
      idGasto,
      monto,
      concepto,
      usuarioCreacion,
      estado
    }
    return this.http.post(this.apiUrl + '/gastoRuta', body, { headers });
  }


  constructor() { }
}
