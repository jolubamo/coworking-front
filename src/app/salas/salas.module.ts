import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalasRoutingModule } from './salas-routing.module';
import { SalasComponent } from './salas.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    SalasComponent
  ],
  imports: [
    CommonModule,
    SalasRoutingModule,
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
export class SalasModule { }
