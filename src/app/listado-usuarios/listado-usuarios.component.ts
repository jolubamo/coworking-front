import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioRol } from 'src/app/models/usuario-rol';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { role } from 'src/app/shared/role';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';
import { UsuarioRolService } from '../services/usuario-rol.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  superAdmin: boolean = this.logicaGuard.permisoValido([role.superAdmin]);
  form: FormGroup;
  mensajeSatisfactorio: string = 'Satisfactorio';

  displayedColumns: string[] = ['nombre', 'correo','rol','reservar'];
  dataSource = new MatTableDataSource<UsuarioRol>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private usuarioRolService: UsuarioRolService,
    private router: Router,
    private toastr: ToastrService,
    private logicaGuard: LogicaGuardService
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.usuarioRolService.getUsuarioRol().subscribe(data => {
      this.dataSource = new MatTableDataSource<UsuarioRol>(data);
      this.paginator.firstPage();
      this.dataSource.paginator=this.paginator;
    })
  }

  private mensajeError(err: any) {
    this.toastr.error('Ha Ocurrido un Problema');
  }

  eliminar(id: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No Podras Revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioRolService.eliminar(id).subscribe(data => {
          this.toastr.success(this.mensajeSatisfactorio);
          this.listar();

        }, err => this.mensajeError(err));
      }
    })
  }

  openDialog(element:any){

  }
  openDialogReservar(element:any){
    
  }
  agregar(){
   this.router.navigateByUrl('registrar-usuario');
  }
}
