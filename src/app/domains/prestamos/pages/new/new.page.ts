import { Component, OnInit, Signal, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime } from '@ionic/angular';
import { Cliente } from 'src/app/domains/shared/models/cliente.model';
import { Combo } from 'src/app/domains/shared/models/combo.model';
import { Prestamo } from 'src/app/domains/shared/models/prestamo.model';
import { ClienteService } from 'src/app/domains/shared/services/cliente.service';
import { GeneralService } from 'src/app/domains/shared/services/general.service';
import { PrestamoService } from 'src/app/domains/shared/services/prestamo.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  // private navController = inject(NavController);
  private clienteService = inject(ClienteService)
  private generalService = inject(GeneralService)
  private prestamoService = inject(PrestamoService);

  private router = inject(Router)


  prestamo! :Prestamo

  tipoPagos = signal<Combo[]>([]); 


  selectedDate: string = ''
  cuotas : number = 0

  constructor() { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      {
        next:(data)=>{
            this.clientes.set(data.data)
        }
      }
    )

    this.generalService.getCombo("TIPOPAGO").subscribe(
      {
        next:(data)=>{
            this.tipoPagos.set(data.data)
            console.log(this.tipoPagos())
        }
      }
    )



  }

  searchTerm: string = '';
  creditoMonto: number | null = null;
  selectedClient: Cliente | null = null;

  cliente! : Cliente


  // Simulación de una lista de clientes
  clientes = signal<Cliente[]>([]); // Nueva señal para la clientes

  filteredClients: Cliente[] = [];

  showDateTime:boolean = false

  isNuevo : boolean = false

  mostrarDateTime() {
    console.log('mostrar')
      this.showDateTime = true;  // Mostrar el ion-datetime

  }
  ocultarDateTime() {
console.log('ocular')
setTimeout(() => {
  this.showDateTime = false;  // Mostrar el ion-datetime
}, 200);
   

}
fechaInicio : string = ''
fechaFin : string = ''
monto! : number
montoCuota : number = 0

  seleccionarFecha(event: any) {

    
    const fechaSeleccionada = new Date(event.detail.value);



      // Mostrar la fecha en el formato deseado
      const fechaInicio = fechaSeleccionada.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      let nuevaFecha = new Date(fechaSeleccionada);

      nuevaFecha.setDate(nuevaFecha.getDate() + this.cuotas);

      const nuevaFe = nuevaFecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      let fechaCobro = new Date(fechaSeleccionada);

      fechaCobro.setDate(fechaCobro.getDate() + 1);

      const nuevaFeCbro = fechaCobro.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });





      console.log(fechaInicio);
      this.fechaInicio = fechaInicio
      this.fechaFin = nuevaFe
      this.fechaCobro = nuevaFeCbro




      this.showDateTime = false;

  }

  // ejecutarBackButton() {
  //   this.navController.back();  // Simula la acción del ion-back-button
  // }



  // Filtrar los clientes según el texto ingresado
  filterClients(event: any) {
    const query = event.target.value.toLowerCase();
    
    if (!query || query.trim() === '') {
      this.filteredClients = [];
      return;
    }

   // Filtro por nombre completo o número de documento
   this.filteredClients = this.clientes().filter(client => {
    const fullName = `${client.nombres} ${client.apellidos}`.toLowerCase();
    return fullName.includes(query) || client.numeroDocumento.includes(query);
  });
  }

  // Seleccionar un cliente de la lista de sugerencias
  selectClient(client: Cliente) {
    this.cliente = client
    this.selectedClient = client;
    this.searchTerm = client.nombreCompleto;  // Mostrar el nombre completo en el input
    this.filteredClients = [];  // Limpiar las sugerencias
  }

  // Registrar el crédito para el cliente seleccionado
  registrarCredito() {
    if (this.selectedClient && this.creditoMonto) {
      const nuevoCredito = {
        clienteId: this.selectedClient.idCliente,
        monto: this.creditoMonto
      };

      console.log('Registrando crédito:', nuevoCredito);
      // Aquí iría la lógica para hacer la petición HTTP y registrar el crédito en el backend.
      
      // Reiniciar los campos después de registrar
      this.resetForm();
    }
  }

  // Resetear el formulario
  resetForm() {
    this.searchTerm = '';
    this.creditoMonto = null;
    this.selectedClient = null;
  }

  // Crear un nuevo cliente
  createNewClient() {
    // Lógica para crear un nuevo cliente (puedes implementar un modal o redirigir a un formulario de creación)
    console.log('Crear nuevo cliente');
    const nuevoCliente  = {
      idCliente:0,
      idTipoDocumento: 0,
      tipoDocumento: '',
      numeroDocumento:'',
      nombres: '',
      apellidos: '',
      nombreCompleto: '',
      direccion: '',
      celular: '',
      fechaCreacion: '',
      estado: '',
      codigoEstado: true,
      isEditado:false,
      isEditando:true,
    };
    this.cliente = nuevoCliente
    this.isNuevo = true;
  }

  
  cancelar(cliente : Cliente){
    this.isNuevo = false;
    cliente.isEditando = false;
  }

  async guardar(cliente: Cliente) {

    cliente.codigoEstado = Boolean(cliente.codigoEstado)
    cliente.idCliente = 99999
    cliente.nombreCompleto = cliente.nombres + ' ' + cliente.apellidos
    cliente.tipoDocumento = cliente.idTipoDocumento == 1 ? 'DNI' : 'CE'

    this.clienteService.insertaCliente(cliente).subscribe({
      next: (response) => {
        console.log('respose:', response);
        cliente.idCliente = response.data
        cliente.isEditando = false
        this.cliente = cliente

        this.searchTerm = this.cliente.nombreCompleto
        this.selectedClient = this.cliente
        this.isNuevo = false


      },
      error: (error) => {
        cliente.isEditando = true
        console.error('Error en el pago:', error);
      },
    });


  }

  cambiarTipoPago(event : any){
    const opcionSeleccionada = this.tipoPagos().find(opcion => opcion.id === event.detail.value);
    console.log(opcionSeleccionada)
    this.cuotas = Number(opcionSeleccionada?.value1)
  }

  CalcularMontoCuota(event : any){
    const input = event.target.value;
    if(Number(input)){
      console.log('CalcularMontoCuota',input)
      this.montoCuota = this.monto * (1 + (this.interes / 100)) / this.cuotas
    }
   
  }
  capitalPrestamo!:number
  utilidadPrestamo!:number

  interes:number = 20
  interesString : string = this.interes + '%'
  total!:number

  GenerarCouta(){
    this.montoCuota = this.monto * (1 +  (this.interes / 100)) / this.cuotas
    this.capitalPrestamo = this.monto
    this.utilidadPrestamo = this.monto * ( (this.interes / 100)) 

    this.total = Number(this.capitalPrestamo) + Number(this.utilidadPrestamo)
  }
  idTipoPago :number=0
  fechaCobro:string =''

  grabarPrestamo() {
console.log('grabarPrestamo')
    this.prestamoService.insertaPrestamo(this.cliente.idCliente,1,this.idTipoPago,this.monto,this.montoCuota,this.interes,this.total,this.fechaInicio,this.fechaFin,this.fechaCobro,'UADMIN').subscribe(
      {
        next: (data) => {
          console.log(data)
          if(data.succeeded == true){
            console.log(data)
           // this.ejecutarBackButton()
           this.router.navigate(['/prestamo'])
          }
        }
      }
    )

  }





}
