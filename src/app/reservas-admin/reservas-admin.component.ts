import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Horario } from '../models/horario';
import { Reserva } from '../models/reserva';
import { Sala } from '../models/sala';
import { TipoSala } from '../models/tipo-sala';
import { ReservarModalComponent } from '../reservar-modal/reservar-modal.component';
import { ReservaService } from '../services/reserva.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservas-admin',
  templateUrl: './reservas-admin.component.html',
  styleUrls: ['./reservas-admin.component.css'],
  providers: [DatePipe]
})
export class ReservasAdminComponent implements OnInit {

  lstTipos: TipoSala[];
  form: FormGroup;
  displayedColumns: string[] = ['sala', 'usuario', 'fecha', 'reservar', 'calendario'];
  dataSource = new MatTableDataSource<Reserva>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public events: any[] = [];
  public salas: Sala[];
  mensajeSatisfactorio: string = 'Satisfactorio';
  minEndDate: Date | null = null;

  constructor(
    public dialog: MatDialog,
    private reservaService: ReservaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.cargarReservas();
    this.initForm();
  }
  private initForm(): void {
    this.form = this.fb.group({
      fechaInicio: new FormControl(''),
      fechaFin: new FormControl('')
    })
  }

  openDialog(element: Reserva) {
    this.events = [];
    element.horas.forEach((hora: Horario) => {
      let fecha: Date = new Date(element.fecha);
      let event = {
        title: hora.titulo,
        start: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), parseInt(hora.inicio.split(':')[0])),
        end: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), parseInt(hora.fin.split(':')[0])),
      };
      this.events.push(event);
    });
    const dialogRef = this.dialog.open(CalendarComponent, {
      height: '520px',
      width: '600px',
      data: { events: this.events, propio: element.fecha }
    });
  }

  cargarReservas(): void {
    this.reservaService.getReserva().subscribe((data: Reserva[]) => {
      this.dataSource = new MatTableDataSource<Reserva>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });

  }

  openDialogReservar(element: Sala) {
    const dialogRef = this.dialog.open(ReservarModalComponent, {
      height: '520px',
      width: '600px',
      data: element
    });
  }

  cancelarReserva(reserva: number) {
    Swal.fire({
      title: 'Estás seguro de cancelar tu reserva?',
      text: "No Podras Revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.eliminar(reserva).subscribe(data => {
          this.toastr.success(this.mensajeSatisfactorio);
          this.cargarReservas();
        }, err => this.mensajeError(err));
      }
    })
  }
  private mensajeError(err: any) {
    this.toastr.error('Ha Ocurrido un Problema');
  }

  generarPDF() {
    if (this.form.get('fechaInicio')?.value != '' && this.form.get('fechaFin')?.value != '') {
      this.reservaService.PDFReservasEntreFechas(this.formatDate(this.form.get('fechaInicio').value), this.formatDate(this.form.get('fechaFin').value)).subscribe((response) => {
        let file = new Blob([response], { type: 'octet/stream' });
        var fileURL = URL.createObjectURL(file);
        var archivo = document.createElement("a");
        archivo.download = 'ReporteReservas.pdf';
        archivo.href = fileURL;
        archivo.click();
      }, (err) => {
        this.mensajeError(err);
      });
    }else{
      this.reservaService.PDFTodasLasReservas().subscribe((response) => {
        let file = new Blob([response], { type: 'octet/stream' });
        var fileURL = URL.createObjectURL(file);
        var archivo = document.createElement("a");
        archivo.download = 'ReporteReservas.pdf';
        archivo.href = fileURL;
        archivo.click();
      }, (err) => {
        this.mensajeError(err);
      });
    }
    
  }
  updateEndDateMin() {
    const startDate = this.form.get('fechaInicio')?.value;
    this.minEndDate = startDate ? new Date(startDate) : null;
    this.form.get('fechaFin')?.updateValueAndValidity();

    if (this.form.get('fechaInicio')?.value != '' && this.form.get('fechaFin')?.value != '') {
      this.reservaService.listarPorFechas(this.formatDate(this.form.get('fechaInicio').value), this.formatDate(this.form.get('fechaFin').value)).subscribe((data: Reserva[]) => {
        this.dataSource = new MatTableDataSource<Reserva>(data);
        this.paginator.firstPage();
        this.dataSource.paginator = this.paginator;
      })
    }
  }
  formatDate(date: Date | null): string | null {
    return date ? this.datePipe.transform(date, 'yyyy-MM-dd') : null;
  }
}
