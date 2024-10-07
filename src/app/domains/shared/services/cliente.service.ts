import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private http = inject(HttpClient)

  // private apiUrl = 'https://localhost:7283/api/v1/cliente';
  private apiUrl = 'https://qaapi.factoringplusperu.com/qa.apifactoringtest/api/v1/cliente'

  constructor() { }

  getClientes() {
    return this.http.get<Response>(this.apiUrl)
  }

  insertaCliente(cliente : Cliente): Observable<any> {
    debugger;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 
      idTipoDocumento : cliente.idTipoDocumento,
      numeroDocumento : cliente.numeroDocumento,
      nombres : cliente.nombres,
      apellidos : cliente.apellidos,
      direccion : cliente.direccion,
      celular : cliente.celular,
      usuarioCreacion : "ADMIN",
      estado : cliente.codigoEstado
     };
    return this.http.post(this.apiUrl, body, { headers });
  }

  actualizaCliente(cliente : Cliente): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { 

      idCliente : cliente.idCliente,
      nombres : cliente.nombres,
      apellidos : cliente.apellidos,
      direccion : cliente.direccion,
      celular : cliente.celular,
      usuarioModificacion : "ADMIN",
      estado : cliente.codigoEstado
     };
    return this.http.post(this.apiUrl + '/update', body, { headers });
  }
}
