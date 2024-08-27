import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisReservasRoutingModule } from './mis-reservas-routing.module';
import { MisReservasComponent } from './mis-reservas.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    MisReservasComponent
  ],
  imports: [
    CommonModule,
    MisReservasRoutingModule,
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
export class MisReservasModule { }
