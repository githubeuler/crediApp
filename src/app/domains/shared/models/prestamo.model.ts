export interface Prestamo {
  idDetallePrestamo:number;
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
  isPagando:boolean;
  montoCapital:number;
  montoTotal:number;
  fechaInicial:string;
  fechaFinal:string;
  formaPago:string;
  ultimaFechaPago:string;
  diasSinPago:number;
  pagoHoy:string;
}
