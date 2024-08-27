import { Sala } from "./sala";
import { Usuario } from "./usuario";

export class ReservaDto {
    id: number;
    usuario: Usuario;
    sala: Sala;
    horas: string;
    fecha: Date;
}
