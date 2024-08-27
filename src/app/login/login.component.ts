import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';
import { role } from '../shared/role';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogicaGuardService } from '../guard/logica-guard.service';
import { NavService } from '../services/nav.service';
import { SeguridadService } from '../services/seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  admin: boolean;
  sesion: boolean;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private logicaGuardNav: LogicaGuardService,
    private navService:NavService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private seguridadService: SeguridadService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.validar();
  }


  private initForm(): void {
    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
    })
  }

  onLoginClick(): void {
    this.loginService.login(this.form.get('usuario').value, this.form.get('clave').value).subscribe(res => {
      //sessionStorage.setItem(environment.tokenName, res.access_token);
      this.seguridadService.generarCodigo(res.access_token).subscribe(data=>{
        console.log(data);
        localStorage.setItem('usuario', this.form.get('usuario').value);
        this.pagina();
      },
      (error) => {
        console.error('Error al generar el código:', error);
      })
      
    }, err => {
      if (err.status == 500) {
        // error en el servidor
        this.mensajeError("Error en el servidor");
      } else {
        // credenciales incorrectas
        this.mensajeError("Credenciales incorrectas");
      }
    });
  }

  private mensajeError(err: any) {
    this.spinner.hide();

    this.toastr.error(err);
  }

  pagina(): void {

    this.router.navigateByUrl('/verification');

    this.navService.navLogin.emit(this.sesion);
  }

  validar():void{
    if(sessionStorage.getItem(environment.tokenName)!=null){
      this.router.navigateByUrl('/inicio');
    }
  }

  move(ruta): void {
    this.router.navigateByUrl(ruta);
  }

}
