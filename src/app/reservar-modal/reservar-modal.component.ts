import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { HorarioService } from '../services/horario.service';
import { BuscarHorasDisponiblesDto } from '../models/buscar-horas-disponibles-dto';
import { Horario } from '../models/horario';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogData } from '../calendar/calendar.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sala } from '../models/sala';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva';
import { ReservaDto } from '../models/reserva-dto';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-reservar-modal',
  templateUrl: './reservar-modal.component.html',
  styleUrls: ['./reservar-modal.component.css']
})
export class ReservarModalComponent implements OnInit {

  toppings = new FormControl();
  horarios: Horario[];
  form: FormGroup;
  minDate = new Date(); 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Sala,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      fecha: new FormControl('', Validators.required),
      horarios: new FormControl('', Validators.required)
    })
  }

  pickDate(event: MatDatepickerInputEvent<string>) {
    this.horarios = [];
    this.spinner.show();
    let dto: BuscarHorasDisponiblesDto = new BuscarHorasDisponiblesDto();
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(event.value, 'yyyy-MM-dd');
    dto.disponibilidad = this.data.disponibilidad;
    dto.fecha = formattedDate;
    dto.idSala = this.data.id;
    this.horarioService.crearSinArchivo(dto).subscribe((data: Horario[]) => {
      this.horarios = data;
      this.spinner.hide();
    })

    
  }
  clickReservar(){
    let reserva: ReservaDto = new ReservaDto();
    let sala: Sala = new Sala();
    let usuario: Usuario = new Usuario();
    usuario.documento = localStorage.getItem('usuario');
    reserva.usuario = usuario;
    sala.id = this.data.id;
    reserva.sala = sala;
    reserva.fecha = this.form.get('fecha').value;
    const concatenado: string = this.form.get('horarios').value.join(',');
    reserva.horas = concatenado;

    this.reservaService.crear(reserva).subscribe(data=>{
    })
  }
}
