import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private http = inject(HttpClient)

  // private apiUrl = 'https://localhost:7283/api/v1/Prestamo';
  private apiUrl = 'https://qaapi.factoringplusperu.com/qa.apifactoringtest/api/v1/prestamo'

  constructor() { }

  getPrestamos() {
    return this.http.get<Response>(this.apiUrl)
  }

  insertaPrestamo(idCliente: number, idRuta: number,idTipoPago: number,montoCapital: number,montoCuota: number,tasaInteres: number,montoTotal: number,fechaInicial: string,fechaFinal: string,fechaCobro: string,usuarioCreacion: string,): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      idCliente,
      idRuta,
      idTipoPago,
      montoCapital,
      montoCuota,
      tasaInteres,
      montoTotal,
      fechaInicial,
      fechaFinal,
      fechaCobro,
      usuarioCreacion,
    }
    return this.http.post(this.apiUrl, body, { headers });
  }


  insertaPagoPrestamo(idPrestamo: number, monto: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { idPrestamo, monto };
    return this.http.post(this.apiUrl + '/pagoprestamo', body, { headers });
  }

}
