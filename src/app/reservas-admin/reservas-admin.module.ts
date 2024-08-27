import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasAdminRoutingModule } from './reservas-admin-routing.module';
import { ReservasAdminComponent } from './reservas-admin.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ReservasAdminComponent
  ],
  imports: [
    CommonModule,
    ReservasAdminRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class ReservasAdminModule { }
