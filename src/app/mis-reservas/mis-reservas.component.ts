import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Horario } from '../models/horario';
import { Reserva } from '../models/reserva';
import { Sala } from '../models/sala';
import { TipoSala } from '../models/tipo-sala';
import { ReservarModalComponent } from '../reservar-modal/reservar-modal.component';
import { ReservaService } from '../services/reserva.service';
import { SalaService } from '../services/sala.service';
import { TipoSalaService } from '../services/tipo-sala.service';
import { CalendarComponent } from '../calendar/calendar.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  lstTipos: TipoSala[];
  today: Date = new Date();

  displayedColumns: string[] = ['sala', 'fecha', 'reservar','calendario'];
  dataSource = new MatTableDataSource<Reserva>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public events: any[] = [];
  public salas: Sala[];
  mensajeSatisfactorio: string = 'Satisfactorio';

  constructor(
    public dialog: MatDialog,
    private reservaService: ReservaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarReservas();
  }
  isDateInTheFuture(fecha: string): boolean {
    const elementDate = new Date(fecha).setHours(0, 0, 0, 0);
    const todayDate = new Date().setHours(0, 0, 0, 0);
    return elementDate < todayDate;
  }
  openDialog(element:Reserva) {
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

  cargarReservas(): void{
    this.reservaService.getReservaPorUsuario(localStorage.getItem('usuario')).subscribe((data:Reserva[])=>{
      this.dataSource = new MatTableDataSource<Reserva>(data);
      this.paginator.firstPage();
      this.dataSource.paginator=this.paginator;
    });

  }

  openDialogReservar(element:Sala){
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

}
