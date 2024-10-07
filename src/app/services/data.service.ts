import { Injectable } from '@angular/core';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

export interface Prestamo {
  idPrestamo:number;
  cuotas: number;
  cuotasPendientes: number;
  cuotasPagadas: number;
  saldo: number;
  cliente: string;
  cuota: number;
  abono: number;
  estado:string;
}
export interface Response {
  succeeded:boolean;
  message: string;
  errors: string;
  data: any;
  
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];

  public prestamos: Prestamo[] = [
    // {
    //   cuotas:24,
    //   cuotasPendientes: 23,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Euler Augusto Tuesta Bardales',
    //   cuota: 10,
    //   abono : 10
    // },
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // },
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // },
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // },
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // },
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
    // ,
    // {
    //   cuotas:24,
    //   cuotasPendientes: 24,
    //   cuotasPagadas: 1,
    //   saldo: 230,
    //   cliente: 'Juan Perez',
    //   cuota: 10,
    //   abono : 10
    // }
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  public getPrestamos(): Prestamo[] {
    return this.prestamos;
  }
}
