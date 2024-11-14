import { Component, OnInit, Signal, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonDatetime } from '@ionic/angular';
import { Cliente } from 'src/app/domains/shared/models/cliente.model';
import { Combo } from 'src/app/domains/shared/models/combo.model';
import { Prestamo } from 'src/app/domains/shared/models/prestamo.model';
import { ClienteService } from 'src/app/domains/shared/services/cliente.service';
import { GeneralService } from 'src/app/domains/shared/services/general.service';
import { PrestamoService } from 'src/app/domains/shared/services/prestamo.service';
import { formatDate } from '@angular/common';
import { InterfaceService } from 'src/app/domains/shared/services/interface.service';

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
  private toast = inject(InterfaceService)
  private interfaceService = inject(InterfaceService)
  private alertController = inject(AlertController)

  private router = inject(Router)


  prestamo! :Prestamo

  tipoPagos = signal<Combo[]>([]); 

  presentingElement : any;

  cuotas : number = 0
  minDate: string = ''; // La fecha mínima es hoy

  @ViewChild('dateModal') dateModal: any;
  selectedDate: string | null = null;

  constructor() { 
    this.setMinDate()
  }
  setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()) //+ 1); // Sumamos un día
    this.minDate = tomorrow.toISOString(); // Establecemos mañana como la fecha mínima
  }

  async onDateSelected(event: any) {
    const selected = event.detail.value;
    this.selectedDate = formatDate(selected, 'dd/MM/yyyy', 'en'); // Guardamos la fecha seleccionada
    const fechaInicio = this.addDaysToDate(this.selectedDate, 0);
    const nuevaFe = this.addDaysToDate(this.selectedDate, this.cuotas);
    const nuevaFeCbro = this.addDaysToDate(this.selectedDate, 1);
    this.fechaInicio = fechaInicio
    this.fechaFin = nuevaFe
    this.fechaCobro = nuevaFeCbro
    this.showDateTime = false;


    //await this.dateModal.dismiss(); // Cerramos el modal
  }
async openDateModal() {
    await this.dateModal.present();
  }

  user : any;

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
     
      this.user = JSON.parse(userData);
     
    }

    this.clienteService.getClientes(this.user.idRuta).subscribe(
      {
        next:(data)=>{
            this.clientes.set(data.data)
        }
      }
    )

    this.generalService.getCombo("TIPOPAGO",'1').subscribe(
      {
        next:(data)=>{
          if (data.succeeded == true) {
            this.tipoPagos.set(data.data)
            this.idTipoPago = data.data[0].id
            this.cuotas = data.data[0].value1
            console.log(this.tipoPagos())
          }
           
        }
      }
    )

    this.presentingElement = document.querySelector('.ion-page');
  }

  closePage(){
    this.router.navigate(['/prestamo']);
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

  


   parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // Meses en JavaScript son base 0 (enero es 0)
}

 formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses en base 0, así que sumamos 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

 addDaysToDate(dateString: string, days: number): string {
    const date = this.parseDate(dateString);
    const resultDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000); // Añade los días en milisegundos
    return this.formatDate(resultDate);
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
      idTipoDocumento: 1,
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

    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.clienteService.insertaCliente(cliente,this.user.idUsuario,this.user.idRuta).subscribe({
      next: (data) => {
        loading.dismiss()
        if (data.succeeded == true) {
          this.interfaceService.toastr('success','El cliente se registro correctamente',':)')
          cliente.codigoEstado = Boolean(cliente.codigoEstado)
          cliente.idCliente = 99999
          cliente.nombreCompleto = cliente.nombres + ' ' + cliente.apellidos
          cliente.tipoDocumento = cliente.idTipoDocumento == 1 ? 'DNI' : 'CE'

          console.log('respose:', data);
          cliente.idCliente = data.data
          cliente.isEditando = false
          this.cliente = cliente

          this.searchTerm = this.cliente.nombreCompleto
          this.selectedClient = this.cliente
          this.isNuevo = false
        } else {
          this.interfaceService.toastr('error',data.message,':(')
        }
        


      },
      error: (data) => {
        loading.dismiss();
        cliente.isEditando = true

        this.interfaceService.toastr('error',data.error.Message,':(')


        console.error('Error en el pago:', data);
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
    if (this.fechaInicio.length <= 0) {
      
     this.interfaceService.toastr('warning','Favor de seleccionar fecha de inicio','Advertencia')
    }else{
      this.montoCuota = this.monto * (1 +  (this.interes / 100)) / this.cuotas
      this.capitalPrestamo = this.monto
      this.utilidadPrestamo = this.monto * ( (this.interes / 100)) 
  
      this.total = Number(this.capitalPrestamo) + Number(this.utilidadPrestamo)
    }

  }
  idTipoPago :number=0
  fechaCobro:string =''

  async grabar(){
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.prestamoService.insertaPrestamo(this.cliente.idCliente,this.user.idRuta,this.idTipoPago,this.monto,this.montoCuota,this.interes,this.total,this.fechaInicio,this.fechaFin,this.fechaCobro,this.user.idUsuario).subscribe(
      {
        next: (data) => {
          loading.dismiss()
          console.log(data)
          if(data.succeeded == true){
            this.interfaceService.toastr('success','El prestamo se registro correctamente',':)')
            console.log(data)
           // this.ejecutarBackButton()
           //this.router.navigate(['/prestamo'], { replaceUrl: true });
           this.closePage()
          }else{
            this.interfaceService.toastr('error',data.message,':(')
          }
        },
        error:(data)=>{
          loading.dismiss()
          this.interfaceService.toastr('error',data.error.Message,':(')
          console.log(data)
        }
      }
    )
  }

  async grabarPrestamo() {
console.log('grabarPrestamo')
const alert = await this.alertController.create({
  header: 'Confirmar',
  message: `¿Estás seguro de grabar los datos?`,
  buttons: [
    {
      text: 'NO',
      role: 'cancel',
      handler: () => {
       
      },
    },
    {
      text: ' SI ',
      cssClass:'bYes',
      handler: () => {
       this.grabar()
      },
    },
  ],
});

await alert.present();

 

  }





}
