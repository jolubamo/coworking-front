import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoUsuariosRoutingModule } from './listado-usuarios-routing.module';
import { ListadoUsuariosComponent } from './listado-usuarios.component';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ListadoUsuariosComponent
  ],
  imports: [
    CommonModule,
    ListadoUsuariosRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class ListadoUsuariosModule { }
