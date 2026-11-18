export type Categoria =
    | "Playa"
    | "Montaña"
    | "Ciudad"
    | "Naturaleza"
    | "Turismo cultural"
    | "Otros";

export interface Viaje {
    id: number;
    nombre: string;
    pais: string;
    ciudad: string;
    fecha: string;
    imagen: string;
    descripcion: string;
    categoria: Categoria;
    calificacion: number;
}

export interface ViajeForm {
    nombre: string;
    pais: string;
    ciudad: string;
    fecha: string;
    imagen: string;
    descripcion: string;
    categoria: Categoria;
    calificacion: number;
}