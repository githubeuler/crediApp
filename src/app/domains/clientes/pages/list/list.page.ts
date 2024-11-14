import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cliente } from 'src/app/domains/shared/models/cliente.model';
import { ClienteService } from 'src/app/domains/shared/services/cliente.service';
import { InterfaceService } from 'src/app/domains/shared/services/interface.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private clienteService = inject(ClienteService);
  private alertController = inject(AlertController); // Inyectamos el controlador de alertas
  private interfaceService = inject(InterfaceService)
  private router = inject(Router)

  filtro = signal<'TODOS'|'ACTIVO'|'INACTIVO'>('TODOS') // Nueva señal para los filtros
  clientes = signal<Cliente[]>([]); // Nueva señal para la clientes
  searchTerm = signal<string>(''); // Nueva señal para la búsqueda
  user : any

  flagResponseClientes = false;

  clientesByfilter = computed(() => {

    const filter = this.filtro()
    const clientes = this.clientes()
    const term = this.searchTerm().toLowerCase();
    
    return clientes
      .filter(cliente => 
        (filter === 'TODOS' || cliente.estado === filter) &&
        cliente.nombreCompleto.toLowerCase().includes(term) // Filtra por cliente
      );
  })

  constructor() { }

  ngOnInit() {
    
    const userData = localStorage.getItem('user');
    if (userData) {
     
      this.user = JSON.parse(userData);
     
    }

    this.getClientes()
  }
  closePage(){
    this.router.navigate(['/home'])
  }

  async getClientes() {
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.clienteService.getClientes(this.user.idRuta).subscribe(
      {
        next:(data)=>{
          loading.dismiss()
          if (data.succeeded == true) {
            this.flagResponseClientes = true
            console.log(data.data)
            this.clientes.set(data.data)
          }
         
          
        },error:(data) =>{
          loading.dismiss()
          this.flagResponseClientes = true


          console.log(data)
        },
      }
    )
  }

  changeFilter(filter : 'TODOS'|'ACTIVO'|'INACTIVO'){
    this.filtro.set(filter)
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.searchTerm.set(query); // Actualiza el término de búsqueda
  }

  editarDatos(cliente : Cliente){
    cliente.isEditando = true;
  }

  cancelar(cliente : Cliente){
    if (cliente.idCliente == 0) {
      const clientesActualizados = this.clientes().filter(cli => cli.idCliente !== cliente.idCliente);
      this.clientes.set(clientesActualizados);
    }
    
    cliente.isEditando = false;
  }

  async guardar(cliente: Cliente) {

    cliente.codigoEstado = Boolean(cliente.codigoEstado)

    if (cliente.idCliente == 0) {
      cliente.idCliente = 99999
      cliente.nombreCompleto = cliente.nombres + ' ' + cliente.apellidos
      cliente.tipoDocumento = cliente.idTipoDocumento == 1 ? 'DNI' : 'CE'
      cliente.estado = (cliente.codigoEstado == true ? 'ACTIVO' : 'INACTIVO')

      this.insertaCliente(cliente)
    } else {
      this.actualizaCliente(cliente)
    }

  }

  nuevoCliente(){

    if (this.clientes()[0]?.idCliente != 0) {
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
      const listaIsEdindoFalse = this.clientes().map(cliente => {
        return { ...cliente, isEditando: false }; // Usar spread para crear una copia del cliente con isEditando en false
      });
      // Actualizar la signal agregando el nuevo cliente en la posición 0
      const ListaConNuevoItem = [nuevoCliente, ...listaIsEdindoFalse];
      this.clientes.set(ListaConNuevoItem);  // Actualizar la signal con el nuevo array
    }

   
  }

  async insertaCliente(cliente:Cliente){
    this.clienteService.insertaCliente(cliente,this.user.idUsuario,this.user.idRuta).subscribe({
      next: (data) => {
        if (data.succeeded == true) {
          this.interfaceService.toastr('success','El cliente se registro correctamente',':)')
          console.log('respose:', data);
          cliente.idCliente = data.data
          cliente.isEditando = false
        }else{
          this.interfaceService.toastr('error',data.message,':(')
        }
      },
      error: (data) => {
        cliente.isEditando = true
        this.interfaceService.toastr('error',data.error.Message,':(')
        console.error('Error en el pago:', data);
      },
    });
  }

  

  async actualizaCliente(cliente : Cliente){
    
    this.clienteService.actualizaCliente(cliente,this.user.idUsuario).subscribe({
      next: (response) => {
        console.log('respose:', response);
        cliente.isEditando = false
        this.getClientes()
      },
      error: (error) => {
        cliente.isEditando = true
        console.error('Error en el pago:', error);
      },
    });

  }


}
