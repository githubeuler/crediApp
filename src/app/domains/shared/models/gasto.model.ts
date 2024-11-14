export interface Gasto {
    idGastoRuta:number;
    idGasto: number;
    nombre: string;
    monto: number|undefined;
    concepto: string;
    fechaCrecion:string;
    isEditando:boolean
  }