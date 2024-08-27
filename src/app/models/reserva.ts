import { Horario } from "./horario";
import { Sala } from "./sala";
import { Usuario } from "./usuario";

export class Reserva {
    id: number;
    usuario: Usuario;
    sala: Sala;
    horas: Horario[];
    fecha: Date;
}
