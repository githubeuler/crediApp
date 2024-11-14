import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private http = inject(HttpClient)

  // private apiUrl = 'https://localhost:7283/api/v1/prestamo';
  private apiUrl = environment.ApiUrl + '/prestamo'

  constructor() { }

  getPrestamos(idRuta : number) {

    return this.http.get<Response>(this.apiUrl + '/listprestamo/'+ idRuta )
  }

  insertaPrestamo(idCliente: number, idRuta: number,idTipoPago: number,montoCapital: number,montoCuota: number,tasaInteres: number,montoTotal: number,fechaInicial: string,fechaFinal: string,fechaCobro: string,usuarioCreacion: number,): Observable<any> {
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

  ordenarPrestamos(lst: { idPrestamo: number, prioridad: number }[]): Observable<any> {
    const url = `${this.apiUrl}/orden-prestamo`;
    return this.http.post(url, { lst });
  }


  insertaPagoPrestamo(idDetallePrestamo : number,idPrestamo: number, monto: number,usuarioCreacion:number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { idDetallePrestamo,idPrestamo, monto,usuarioCreacion };
    return this.http.post<Response>(this.apiUrl + '/pagoprestamo', body, { headers });
  }

  getPrestamoDetalle(idPrestamo : number) {

    return this.http.get<Response>(this.apiUrl + '/list-prestamo-detalle/'+ idPrestamo )
  }

}
