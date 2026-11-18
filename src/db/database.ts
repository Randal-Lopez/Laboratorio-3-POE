import initSqlJs from "sql.js";
import type { Database } from "sql.js";
import type { Viaje, ViajeForm } from "../models/Viaje";

let db: Database;

const STORAGE_KEY = "tripbook_database";

export async function inicializarDB(): Promise<void> {
const SQL = await initSqlJs({
    locateFile: (file) => `/${file}`
});

    const guardada = localStorage.getItem(STORAGE_KEY);

    if (guardada) {
        const bytes = Uint8Array.from(atob(guardada), c => c.charCodeAt(0));
        db = new SQL.Database(bytes);
    } else {
        db = new SQL.Database();
    }

    db.run(`
        CREATE TABLE IF NOT EXISTS viajes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            pais TEXT NOT NULL,
            ciudad TEXT NOT NULL,
            fecha TEXT NOT NULL,
            imagen TEXT,
            descripcion TEXT NOT NULL,
            categoria TEXT NOT NULL,
            calificacion INTEGER NOT NULL
        )
    `);

    guardarDB();
}

function guardarDB(): void {
    const datos = db.export();
    let binary = "";

    datos.forEach(byte => {
        binary += String.fromCharCode(byte);
    });

    localStorage.setItem(STORAGE_KEY, btoa(binary));
}

export function obtenerViajes(): Viaje[] {
    const resultado = db.exec("SELECT * FROM viajes ORDER BY fecha DESC");

    if (!resultado.length) return [];

    return resultado[0].values.map(fila => ({
        id: Number(fila[0]),
        nombre: String(fila[1]),
        pais: String(fila[2]),
        ciudad: String(fila[3]),
        fecha: String(fila[4]),
        imagen: String(fila[5] ?? ""),
        descripcion: String(fila[6]),
        categoria: fila[7] as Viaje["categoria"],
        calificacion: Number(fila[8])
    }));
}

export function crearViaje(viaje: ViajeForm): void {
    db.run(
        `INSERT INTO viajes
        (nombre, pais, ciudad, fecha, imagen, descripcion, categoria, calificacion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            viaje.nombre,
            viaje.pais,
            viaje.ciudad,
            viaje.fecha,
            viaje.imagen,
            viaje.descripcion,
            viaje.categoria,
            viaje.calificacion
        ]
    );

    guardarDB();
}

export function actualizarViaje(id: number, viaje: ViajeForm): void {
    db.run(
        `UPDATE viajes SET
        nombre = ?,
        pais = ?,
        ciudad = ?,
        fecha = ?,
        imagen = ?,
        descripcion = ?,
        categoria = ?,
        calificacion = ?
        WHERE id = ?`,
        [
            viaje.nombre,
            viaje.pais,
            viaje.ciudad,
            viaje.fecha,
            viaje.imagen,
            viaje.descripcion,
            viaje.categoria,
            viaje.calificacion,
            id
        ]
    );

    guardarDB();
}

export function eliminarViaje(id: number): void {
    db.run("DELETE FROM viajes WHERE id = ?", [id]);
    guardarDB();
}