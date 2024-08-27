import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavService } from './services/nav.service';
import { ToastrService } from 'ngx-toastr';
import { LogicaGuardService } from './guard/logica-guard.service';
import { role } from './shared/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sesion: boolean = false;
  title = 'citas';
  admin: boolean = false;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private router: Router,
    private navService: NavService,
    private toastr: ToastrService,
    private logicaGuardNav: LogicaGuardService
  ) {

  }
  ngOnInit(): void {
    this.navService.navAdmin.subscribe((data: boolean) => {
      this.admin = data;
    });
    this.navService.navLogin.subscribe((data: boolean) => {
      this.sesion = data;
    });
    this.sesionActivate();
    this.canActivate();
  }


  pagina(ruta): void {
    this.router.navigateByUrl(ruta);
    this.close();
  }

  close() {
    this.sidenav.close();
  }

  closeS() {
    this.toastr.success('Sesion Cerrada');
    this.sesion = !this.sesion;
    this.admin = false;
    this.router.navigateByUrl('login');
    sessionStorage.clear();
    localStorage.clear();
    this.close();
  }

  canActivate():void{
    this.admin = this.logicaGuardNav.permisosValidosNav([role.administrador]);
  }
  sesionActivate(): void {

    if(sessionStorage.getItem('token')==null){
      this.sesion = !this.sesion;
    }
  }
}
