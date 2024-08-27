import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/models/estado';
import { Rol } from 'src/app/models/rol';
import { TipoDocumento } from 'src/app/models/tipo-documento';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioRol } from 'src/app/models/usuario-rol';
import Swal from 'sweetalert2';
import { RolService } from '../services/rol.service';
import { TipoDocumentoService } from '../services/tipo-documento.service';
import { UsuarioService } from '../services/usuario.service';
import { LogicaGuardService } from '../guard/logica-guard.service';
import { role } from '../shared/role';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {

  lstRoles: Rol[];
  sesion: boolean = false;
  lstTiposDocumento: TipoDocumento[];
  form: FormGroup;
  mensajeSatisfactorio: string = 'Satisfactorio';
  editar: boolean = false;
  textoBoton: string = "Guardar Registro";

  constructor(
    private roleService: RolService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder, private toastr: ToastrService,
    private tipoDocumentoService: TipoDocumentoService,
    private router: Router,
    private logicaGuard:LogicaGuardService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if(this.logicaGuard.permisosValidosNav([role.usuario])){
      this.router.navigateByUrl('inicio');
    }
    if(sessionStorage.getItem('token')!=null){
      this.sesion = !this.sesion;
      this.listarRoles();
    }else{
      this.form.get('rol').setValue(2);
    }
    this.listarTiposDocumento()
  }

  listarRoles() {
    this.roleService.getRol().subscribe(data => {
      this.lstRoles = data;
    })
  }


  listarTiposDocumento() {
    this.tipoDocumentoService.getTipoDocumento().subscribe(data => {
      this.lstTiposDocumento = data;

    })
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl(''),
      password: new FormControl('', Validators.required),
      secondPassword: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      rol: new FormControl(0, Validators.required),
      tipoDocumento: new FormControl(0, Validators.required)
    })
  }

  clickEnviar() {
    let usuarioRol: UsuarioRol = new UsuarioRol();
    let usuario: Usuario = new Usuario();
    let rol: Rol = new Rol();
    let tipoDocumento: TipoDocumento = new TipoDocumento();
    let estado: Estado = new Estado();
    estado.id = 1;
    usuario.estado = estado
    usuario.id = this.form.get('id').value;
    usuario.nombre = this.form.get('nombre').value;
    usuario.apellido = this.form.get('apellido').value;
    usuario.email = this.form.get('email').value;
    usuario.password = this.form.get('password').value;
    usuario.documento = this.form.get('documento').value;
    tipoDocumento.id = this.form.get('tipoDocumento').value;
    usuario.tipoDocumento = tipoDocumento;
    rol.id = this.form.get('rol').value;
    usuarioRol.usuario = usuario;
    usuarioRol.rol = rol;
    if (usuario.password != this.form.get('secondPassword').value) {
      Swal.fire({
        title: 'Las contraseñas son distintas',
        icon: 'warning',
      })
    } else {
      if (!this.editar) {
        console.log(usuarioRol);
        this.registrar(usuarioRol);
      }
    }

  }
  registrar(usuarioRol: UsuarioRol): void {
    this.usuarioService.crear(usuarioRol).subscribe(data => {
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.router.navigateByUrl('login');
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {

    this.toastr.error('Ha Ocurrido un Problema');
  }

}
