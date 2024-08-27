import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { role } from './shared/role';
import { AuthGuardService } from './guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./verification/verification.module').then((m) => m.VerificationModule)
  },
  { path: 'reserva', loadChildren: () => import('./reserva/reserva.module').then(m => m.ReservaModule), canActivate: [AuthGuardService], data: {role:[role.administrador, role.usuario]} },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'salas', loadChildren: () => import('./salas/salas.module').then(m => m.SalasModule), canActivate: [AuthGuardService], data: {role:[role.administrador]} },
  { path: 'listado-usuario', loadChildren: () => import('./listado-usuarios/listado-usuarios.module').then(m => m.ListadoUsuariosModule), canActivate: [AuthGuardService], data: {role:[role.administrador]} },
  { path: 'registrar-usuario', loadChildren: () => import('./registrar-usuarios/registrar-usuarios.module').then(m => m.RegistrarUsuariosModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'editar-usuario/:id', loadChildren: () => import('./editar-usuarios/editar-usuarios.module').then(m => m.EditarUsuariosModule), canActivate: [AuthGuardService], data: {role:[role.administrador]} },
  { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
  { path: 'mis-reservas', loadChildren: () => import('./mis-reservas/mis-reservas.module').then(m => m.MisReservasModule) },
  { path: 'sobre-nosotros', loadChildren: () => import('./sobre-nosotros/sobre-nosotros.module').then(m => m.SobreNosotrosModule) },
  { path: 'contacto', loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule) },
  { path: 'reservas-admin', loadChildren: () => import('./reservas-admin/reservas-admin.module').then(m => m.ReservasAdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
