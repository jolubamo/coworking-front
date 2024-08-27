import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sala } from '../models/sala';
import { MatPaginator } from '@angular/material/paginator';
import { SalaService } from '../services/sala.service';
import { EditarSalaComponent } from '../editar-sala/editar-sala.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../models/estado';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'tipo','capacidad', 'estado','equipamiento', 'reservar','calendario'];
  dataSource = new MatTableDataSource<Sala>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  mensajeSatisfactorio: string = 'Satisfactorio';

  constructor(
    private salaService: SalaService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarSalas();
  }

  cargarSalas(): void{
    this.salaService.getSalas().subscribe((data:Sala[])=>{
      this.dataSource = new MatTableDataSource<Sala>(data);
      this.paginator.firstPage();
      this.dataSource.paginator=this.paginator;
    });

  }

  openDialogEditar(element:Sala){
    const dialogRef = this.dialog.open(EditarSalaComponent, {
      height: '520px',
      width: '600px',
      data: {
        sala:element,
        accion:'editar'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarSalas();
    });
  }
  openDialogAgregar(){
    const dialogRef = this.dialog.open(EditarSalaComponent, {
      height: '520px',
      width: '600px',
      data: {
        sala: new Sala(),
        accion:'agregar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarSalas();
    });
  }

  eliminar(sala: Sala) {
    Swal.fire({
      title: 'Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        let estado: Estado = new Estado();
        estado.id = 2;
        sala.estado = estado;
        this.salaService.modificar(sala).subscribe(data => {
          this.toastr.success(this.mensajeSatisfactorio);
          this.cargarSalas();

        }, err => this.mensajeError(err));
      }
    })
  }

  private mensajeError(err: any) {

    this.toastr.error('Ha Ocurrido un Problema');
  }
}
