import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  miFormulario: FormGroup;

  constructor(
    private seguridadService: SeguridadService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('usuario') && !sessionStorage.getItem(environment.tokenName)){
      
      this.router.navigateByUrl('/login');
    }
    if(localStorage.getItem('usuario') && sessionStorage.getItem(environment.tokenName)){
      this.router.navigateByUrl('/inicio');
    }
    this.miFormulario = this.formBuilder.group({
      codigo: ['', Validators.required]
    });
  }

  enviarFormulario() {
    if (this.miFormulario.valid) {
      // Aquí puedes realizar las acciones que desees con el valor del campo

      this.validarCodigo(this.miFormulario.value.codigo);
    }
  }

  validarCodigo(codigo: string) {


    this.seguridadService.validarCodigo(codigo).subscribe(async data => {

      const token: string = window.atob(data.data);
      await sessionStorage.setItem(environment.tokenName, token);
      await sessionStorage.setItem('usuario', this.obtenerUsuarioDelToken(token));
      await this.router.navigateByUrl('reserva');
      await location.reload();
    }, err => {


      if (err.status == 403) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingresó el código incorrecto!'
        })
      }
    })
  }

  obtenerUsuarioDelToken(token: string): any {
    const decodedToken: any = jwtDecode(token);
    const { user_name } = decodedToken;
    return user_name;
  }

}
