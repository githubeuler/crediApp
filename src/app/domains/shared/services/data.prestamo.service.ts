import { Injectable, signal } from '@angular/core';
import { Prestamo } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class DataPrestamoService {

  public prestamos = signal<Prestamo[]>([])

  constructor() { }

}
