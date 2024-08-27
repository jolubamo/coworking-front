import { Estado } from "./estado";
import { TipoSala } from "./tipo-sala";

export class Sala {
    id: number;
    nombre: string;
    tipoSala: TipoSala;
    capacidad: string;
    equipamiento: string;
    disponibilidad: string;
    estado: Estado
}
