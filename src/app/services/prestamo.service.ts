import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from './data.service';



@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private http = inject(HttpClient)

  constructor() { }
  getAll(){
    return this.http.get<Response>('https://localhost:7283/api/v1/Prestamo')
  }

}
