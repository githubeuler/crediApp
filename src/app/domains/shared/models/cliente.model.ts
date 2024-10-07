export interface Cliente {
    idCliente:number;
    idTipoDocumento: number;
    tipoDocumento: string;
    numeroDocumento:string;
    nombres: string;
    apellidos: string;
    nombreCompleto: string;
    direccion: string;
    celular: string;
    fechaCreacion: string;
    estado: string;
    codigoEstado: boolean;
    isEditado:boolean;
    isEditando:boolean;
    
  }