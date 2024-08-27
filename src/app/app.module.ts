import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';

import { FullCalendarModule } from 'primeng/fullcalendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import {MatDividerModule} from '@angular/material/divider';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import { ReservarModalComponent } from './reservar-modal/reservar-modal.component';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarSalaComponent } from './editar-sala/editar-sala.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [				
    AppComponent,
    CalendarComponent,
    ReservarModalComponent,
      EditarSalaComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexLayoutModule,
    ToastrModule.forRoot()
  ],
  providers: [ 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
