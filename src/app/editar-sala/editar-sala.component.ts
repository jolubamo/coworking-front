import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Horario } from '../models/horario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sala } from '../models/sala';
import { NgxSpinnerService } from 'ngx-spinner';
import { HorarioService } from '../services/horario.service';
import { EstadoService } from '../services/estado.service';
import { Estado } from '../models/estado';
import { TipoSalaService } from '../services/tipo-sala.service';
import { TipoSala } from '../models/tipo-sala';
import { SalaService } from '../services/sala.service';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  sala: Sala;
  accion: string;
}

@Component({
  selector: 'app-editar-sala',
  templateUrl: './editar-sala.component.html',
  styleUrls: ['./editar-sala.component.css']
})
export class EditarSalaComponent implements OnInit {

  toppings = new FormControl();
  lstTipos: TipoSala[];
  horarios: Horario[];
  estados: Estado[];
  form: FormGroup;
  boton: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private tipoSalaService: TipoSalaService,
    private estadoService: EstadoService,
    private salaService: SalaService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditarSalaComponent>
  ) { }

  ngOnInit() {
    this.initForm();
    this.cargarTiposSalas();
    this.llenarHorarios();
    this.llenarEstados();

    if (this.data.accion == 'editar') {
      let sala: Sala = this.data.sala;
      const arrayNumeros: number[] = sala.disponibilidad.split(',').map(Number);
      this.form.get('id').setValue(sala.id);
      this.form.get('horarios').setValue(arrayNumeros);
      this.form.get('estado').setValue(sala.estado.id);
      this.form.get('nombre').setValue(sala.nombre);
      this.form.get('capacidad').setValue(sala.capacidad);
      this.form.get('equipamiento').setValue(sala.equipamiento);
      this.form.get('tipo').setValue(sala.tipoSala.id);
      this.boton = 'Editar';
    }else{
      this.boton = 'Agregar';
    }
  }
  cargarTiposSalas(): void {
    this.tipoSalaService.getSalas().subscribe(data => {
      this.lstTipos = data;
    })
  }
  llenarHorarios() {
    this.horarioService.getHorarios().subscribe(data => {
      this.horarios = data;
    })
  }

  llenarEstados() {
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data;
    })
  }

  clickAceptar() {
    let sala: Sala = new Sala();
    let estado: Estado = new Estado();
    let tipoSala: TipoSala = new TipoSala();
    tipoSala.id = this.form.get('tipo').value;
    sala.tipoSala = tipoSala;
    estado.id = this.form.get('estado').value;
    sala.estado = estado;
    sala.nombre = this.form.get('nombre').value;
    sala.capacidad = this.form.get('capacidad').value;
    const concatenado: string = this.form.get('horarios').value.join(',');
    sala.disponibilidad = concatenado;
    sala.equipamiento = this.form.get('equipamiento').value;
    if(this.boton == 'Editar'){
      sala.id = this.form.get('id').value;
      console.log("aaa");
      this.salaService.modificar(sala).subscribe(data=>{

      }, err => this.mensajeError(err))
    }else{
      console.log(sala);
      this.salaService.crear(sala).subscribe(data=>{

      }, err => this.mensajeError(err))
    }
    this.dialogRef.close();
  }
  private mensajeError(err: any) {
    this.toastr.error('Ha Ocurrido un Problema');
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      horarios: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      capacidad: new FormControl('', Validators.required),
      equipamiento: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required)
    })
  }
}
