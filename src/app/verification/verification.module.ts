import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VerificationRoutingModule,
    ReactiveFormsModule
  ]
})
export class VerificationModule { }
