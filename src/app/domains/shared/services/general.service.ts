import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response.model';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private http = inject(HttpClient)

  private apiUrl = 'https://localhost:7283/api/v1/General/combo';

  constructor() { }
  
  getCombo(tipo : string){
    return this.http.get<Response>(this.apiUrl + '/' + tipo)
  }
}
