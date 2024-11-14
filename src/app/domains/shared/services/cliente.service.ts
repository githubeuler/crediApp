import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private http = inject(HttpClient)

  // private apiUrl = 'https://localhost:7283/api/v1/cliente';
  private apiUrl = environment.ApiUrl + '/cliente'

  constructor() { }

  getClientes(idRuta : number) {
    return this.http.get<Response>(this.apiUrl + '/' + idRuta)
  }

  insertaCliente(cliente : Cliente,usuariCreacion:number,idRuta : number): Observable<any> {
   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 
      idTipoDocumento : cliente.idTipoDocumento,
      numeroDocumento : String(cliente.numeroDocumento),
      nombres : cliente.nombres,
      apellidos : cliente.apellidos,
      direccion : cliente.direccion,
      celular : String(cliente.celular),
      usuarioCreacion : usuariCreacion,
      estado : cliente.codigoEstado,
      idRuta
     };
    return this.http.post<Response>(this.apiUrl, body, { headers });
  }

  actualizaCliente(cliente : Cliente,usuarioModificacion:number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 

      idCliente : cliente.idCliente,
      nombres : cliente.nombres,
      apellidos : cliente.apellidos,
      direccion : cliente.direccion,
      celular : cliente.celular,
      usuarioModificacion : usuarioModificacion,
      estado : cliente.codigoEstado
     };
    return this.http.post(this.apiUrl + '/update', body, { headers });
  }
}
