import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from '../calendar/calendar.component';
import { ReservaService } from '../services/reserva.service';
import { Horario } from '../models/horario';
import { SalaService } from '../services/sala.service';
import { Sala } from '../models/sala';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Reserva } from '../models/reserva';
import { ReservarModalComponent } from '../reservar-modal/reservar-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoSalaService } from '../services/tipo-sala.service';
import { TipoSala } from '../models/tipo-sala';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  lstTipos: TipoSala[];

  displayedColumns: string[] = ['nombre', 'tipo','capacidad', 'equipamiento', 'reservar','calendario'];
  dataSource = new MatTableDataSource<Sala>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public events: any[] = [];
  public salas: Sala[];

  constructor(
    public dialog: MatDialog,
    private reservaService: ReservaService,
    private salaService: SalaService,
    private tipoSalaService: TipoSalaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.cargarSalas();
    this.cargarTiposSalas();
  }

  openDialog(id:any) {
    this.events = [];
    this.reservaService.getReservaPorSala(id).subscribe((data: Reserva[]) => {
      data.forEach((element: Reserva) => {
        element.horas.forEach((hora: Horario) => {
          let fecha: Date = new Date(element.fecha);
          let event = {
            title: hora.titulo,
            start: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), parseInt(hora.inicio.split(':')[0])),
            end: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), parseInt(hora.fin.split(':')[0])),
          };
          this.events.push(event);
        });
      });
  
      const dialogRef = this.dialog.open(CalendarComponent, {
        height: '520px',
        width: '600px',
        data: { events: this.events }
      });
    });
  }

  click(element:any){
    if(element == 0){
      this.cargarSalas();
    }else{
      this.salaService.getSalasPorTipoSala(element).subscribe((data:Sala[])=>{
        this.dataSource = new MatTableDataSource<Sala>(data);
        this.paginator.firstPage();
        this.dataSource.paginator=this.paginator;
      });
    }
  }

  cargarTiposSalas():void{
    this.tipoSalaService.getSalas().subscribe(data=>{
      this.lstTipos = data;
    })
  }

  cargarSalas(): void{
    this.salaService.getSalasActivas().subscribe((data:Sala[])=>{
      this.dataSource = new MatTableDataSource<Sala>(data);
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
}
