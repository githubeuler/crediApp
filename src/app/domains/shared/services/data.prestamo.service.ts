import { Injectable, signal } from '@angular/core';
import { Prestamo } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class DataPrestamoService {

  private prestamo: any;

  public prestamos = signal<Prestamo[]>([])

  constructor() { }

  setPrestamo(data: any) {
    this.prestamo = data;
  }

  getPrestamo() {
    return this.prestamo;
  }

}
