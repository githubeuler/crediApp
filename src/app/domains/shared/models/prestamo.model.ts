export interface Prestamo {
  idPrestamo:number;
  cuotas: number;
  cuotasPendientes: number;
  cuotasPagadas: number;
  saldo: number;
  cliente: string;
  cuota: number;
  abono: number;
  pagoDia:number;
  estado:string;
  isPago:boolean;
  isPagando:boolean
}
