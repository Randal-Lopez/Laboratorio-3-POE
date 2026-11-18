
import {
    crearViaje,
    obtenerViajes,
    actualizarViaje,
    eliminarViaje
} from "../db/database";

import type { Viaje, ViajeForm } from "../models/Viaje";
import { ViajeView } from "../views/ViajeView";

export class ViajeController {
    private view: ViajeView;
    private editingId: number | null = null;
    private currentImage = "";
    private busqueda = "";
    private categoria = "Todas";
    private orden = "recientes";

    constructor(view: ViajeView) {
        this.view = view;
    }

    iniciar(): void {
        this.view.renderLayout();
        this.mostrarInicio();

        document.addEventListener("click", event => {
            const target = event.target as HTMLElement;

            const photoButton = target.closest<HTMLButtonElement>("#select-photo");

            if (photoButton) {
                event.preventDefault();
                document.querySelector<HTMLInputElement>("#imagen")?.click();
                return;
            }

            const removeButton = target.closest<HTMLButtonElement>("#remove-photo");

            if (removeButton) {
                event.preventDefault();
                this.quitarFotografia();
                return;
            }

            const ratingButton = target.closest<HTMLButtonElement>("[data-rating]");

            if (ratingButton) {
                event.preventDefault();
                this.seleccionarCalificacion(Number(ratingButton.dataset.rating));
                return;
            }

            const button = target.closest<HTMLElement>("[data-action]");

            if (!button) return;

            const action = button.dataset.action;
            const id = Number(button.dataset.id);

            switch (action) {
                case "home":
                    this.mostrarInicio();
                    break;

                case "form":
                    this.mostrarFormulario();
                    break;

                case "trips":
                    this.mostrarViajes();
                    break;

                case "details":
                    this.mostrarDetalles(id);
                    break;

                case "edit":
                    this.editar(id);
                    break;

                case "delete":
                    this.eliminar(id);
                    break;

                case "close-modal":
                    document.querySelector("#modal-container")!.innerHTML = "";
                    break;

                case "clear-filters":
                    this.busqueda = "";
                    this.categoria = "Todas";
                    this.orden = "recientes";
                    this.mostrarViajes();
                    break;
            }
        });

        document.addEventListener("submit", event => {
            const target = event.target as HTMLFormElement;

            if (target.id === "viaje-form") {
                event.preventDefault();
                this.guardarFormulario(target);
            }
        });

        document.addEventListener("change", event => {
            const target = event.target as HTMLInputElement | HTMLSelectElement;

            if (target.id === "imagen" && target instanceof HTMLInputElement) {
                this.procesarFotografia(target);
            }

            if (target.id === "filter-category") {
                this.categoria = target.value;
                this.mostrarViajes();
            }

            if (target.id === "sort-date") {
                this.orden = target.value;
                this.mostrarViajes();
            }
        });

        document.addEventListener("input", event => {
            const target = event.target as HTMLInputElement;

            if (target.id === "search-input") {
                this.busqueda = target.value;
                this.actualizarResultados();
            }
        });
    }

    private mostrarInicio(): void {
        this.editingId = null;
        this.currentImage = "";
        this.view.renderHome();
    }

    private mostrarFormulario(viaje?: Viaje): void {
        this.editingId = viaje?.id ?? null;
        this.currentImage = viaje?.imagen ?? "";
        this.view.renderForm(viaje);
    }

    private mostrarViajes(): void {
        this.editingId = null;
        this.actualizarResultados();
    }

    private actualizarResultados(): void {
        let viajes = obtenerViajes();

        if (this.busqueda.trim()) {
            const texto = this.busqueda.toLowerCase().trim();

            viajes = viajes.filter(viaje =>
                viaje.nombre.toLowerCase().includes(texto) ||
                viaje.pais.toLowerCase().includes(texto) ||
                viaje.ciudad.toLowerCase().includes(texto)
            );
        }

        if (this.categoria !== "Todas") {
            viajes = viajes.filter(
                viaje => viaje.categoria === this.categoria
            );
        }

        viajes.sort((a, b) => {
            return this.orden === "recientes"
                ? b.fecha.localeCompare(a.fecha)
                : a.fecha.localeCompare(b.fecha);
        });

        this.view.renderTrips(
            viajes,
            this.busqueda,
            this.categoria,
            this.orden,
            obtenerViajes().length
        );
    }

    private mostrarDetalles(id: number): void {
        const viaje = obtenerViajes().find(item => item.id === id);

        if (viaje) {
            this.view.renderDetails(viaje);
        }
    }

    private editar(id: number): void {
        const viaje = obtenerViajes().find(item => item.id === id);

        if (viaje) {
            this.mostrarFormulario(viaje);
        }
    }

    private eliminar(id: number): void {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar este viaje?"
        );

        if (!confirmar) return;

        eliminarViaje(id);

        this.view.showToast("Viaje eliminado correctamente");

        this.actualizarResultados();
    }

    private seleccionarCalificacion(valor: number): void {
        if (!Number.isInteger(valor) || valor < 1 || valor > 5) return;

        const input = document.querySelector<HTMLInputElement>("#calificacion");

        if (!input) return;

        input.value = String(valor);

        document.querySelectorAll(".rating-star").forEach(elemento => {
            const estrella = elemento as HTMLButtonElement;
            const numero = Number(estrella.dataset.rating);

            estrella.classList.toggle("selected", numero <= valor);
        });
    }

    private async procesarFotografia(input: HTMLInputElement): Promise<void> {
        const archivo = input.files?.[0];

        if (!archivo) return;

        const formatos = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!formatos.includes(archivo.type)) {
            this.view.showToast("Formato de imagen no válido", "error");
            input.value = "";
            return;
        }

        if (archivo.size > 2 * 1024 * 1024) {
            this.view.showToast(
                "La fotografía original no debe superar 2 MB",
                "error"
            );
            input.value = "";
            return;
        }

        try {
            const imagen = await this.comprimirImagen(archivo);

            this.currentImage = imagen;

            const preview = document.querySelector("#photo-preview");

            if (!preview) return;

            preview.innerHTML = `
                <img src="${imagen}" class="preview-image" alt="Vista previa">
            `;

            const removeButton = document.querySelector<HTMLButtonElement>(
                "#remove-photo"
            );

            if (removeButton) {
                removeButton.hidden = false;
            }

            this.view.showToast("Fotografía seleccionada correctamente");
        } catch {
            this.view.showToast(
                "No se pudo procesar la fotografía",
                "error"
            );
        }
    }

    private comprimirImagen(archivo: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const imagen = new Image();

                imagen.onload = () => {
                    const maximo = 1200;

                    const escala = Math.min(
                        1,
                        maximo / Math.max(imagen.width, imagen.height)
                    );

                    const canvas = document.createElement("canvas");

                    canvas.width = Math.round(imagen.width * escala);
                    canvas.height = Math.round(imagen.height * escala);

                    const context = canvas.getContext("2d");

                    if (!context) {
                        reject(new Error("No se pudo procesar la imagen"));
                        return;
                    }

                    context.drawImage(
                        imagen,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    resolve(canvas.toDataURL("image/jpeg", 0.75));
                };

                imagen.onerror = () => {
                    reject(new Error("Imagen inválida"));
                };

                imagen.src = String(reader.result);
            };

            reader.onerror = () => {
                reject(new Error("Error al leer la imagen"));
            };

            reader.readAsDataURL(archivo);
        });
    }

    private quitarFotografia(): void {
        this.currentImage = "";

        const preview = document.querySelector("#photo-preview");

        if (preview) {
            preview.innerHTML = `
                <div class="upload-placeholder">
                    <span class="camera-icon">📷</span>
                    <h3>Agrega una fotografía</h3>
                    <p>Selecciona una imagen desde tu dispositivo</p>
                </div>
            `;
        }

        const input = document.querySelector<HTMLInputElement>("#imagen");

        if (input) input.value = "";

        const button = document.querySelector<HTMLButtonElement>(
            "#remove-photo"
        );

        if (button) button.hidden = true;
    }

    private guardarFormulario(form: HTMLFormElement): void {
        const datos = new FormData(form);

        const nombre = String(datos.get("nombre") ?? "").trim();
        const pais = String(datos.get("pais") ?? "").trim();
        const ciudad = String(datos.get("ciudad") ?? "").trim();
        const fecha = String(datos.get("fecha") ?? "");
        const descripcion = String(datos.get("descripcion") ?? "").trim();
        const categoria = String(datos.get("categoria") ?? "");
        const calificacion = Number(datos.get("calificacion"));

        if (
            !nombre ||
            !pais ||
            !ciudad ||
            !fecha ||
            !descripcion ||
            !categoria
        ) {
            this.view.showToast(
                "Completa todos los campos obligatorios",
                "error"
            );
            return;
        }

        if (
            !Number.isInteger(calificacion) ||
            calificacion < 1 ||
            calificacion > 5
        ) {
            this.view.showToast(
                "Selecciona una calificación válida",
                "error"
            );
            return;
        }

        const fechaSeleccionada = new Date(`${fecha}T00:00:00`);

        if (
            Number.isNaN(fechaSeleccionada.getTime()) ||
            fechaSeleccionada.toISOString().slice(0, 10) !== fecha
        ) {
            this.view.showToast("La fecha seleccionada no es válida", "error");
            return;
        }

        const viaje: ViajeForm = {
            nombre,
            pais,
            ciudad,
            fecha,
            descripcion,
            categoria: categoria as ViajeForm["categoria"],
            calificacion,
            imagen: this.currentImage
        };

        try {
            if (this.editingId !== null) {
                actualizarViaje(this.editingId, viaje);
                this.view.showToast("Viaje actualizado correctamente");
            } else {
                crearViaje(viaje);
                this.view.showToast("Viaje registrado correctamente");
            }

            this.editingId = null;
            this.currentImage = "";
            this.busqueda = "";
            this.categoria = "Todas";
            this.orden = "recientes";

            this.mostrarViajes();
        } catch {
            this.view.showToast("No se pudo guardar el viaje", "error");
        }
    }
}
