import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasAdminComponent } from './reservas-admin.component';

const routes: Routes = [{ path: '', component: ReservasAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasAdminRoutingModule { }
