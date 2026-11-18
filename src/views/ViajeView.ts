import type { Viaje } from "../models/Viaje";

export class ViajeView {
    private app: HTMLElement;

    constructor() {
        this.app = document.querySelector<HTMLDivElement>("#app")!;
    }

    renderLayout(): void {
        this.app.innerHTML = `
            <header class="header">
                <a href="#" class="logo" data-action="home">
                    <span class="logo-icon">✈</span>
                    <span>ACORDATE</span>
                </a>

                <nav class="navigation">
                    <button data-action="home" class="nav-link active">Inicio</button>
                    <button data-action="form" class="nav-link">Registrar viaje</button>
                    <button data-action="trips" class="nav-link">Mis viajes</button>
                </nav>

                <button class="header-button" data-action="form">
                    + Nuevo viaje
                </button>
            </header>

            <main id="content"></main>

            <footer class="footer">
                <div class="footer-logo">✈ ACORDATE</div>
                <p>Cada viaje tiene una historia. Guarda la tuya.</p>
                <span>© 2026 ACORDATE - Mi diario de viajes</span>
            </footer>

            <div id="modal-container"></div>
            <div id="toast-container"></div>
        `;
    }

    renderHome(): void {
        const content = document.querySelector("#content")!;

        content.innerHTML = `
            <section class="hero">
                <div class="hero-content">
                    <span class="eyebrow">✦ TU DIARIO DE AVENTURAS</span>

                    <h1>
                        El mundo está lleno de historias.
                        <span>Guarda las tuyas.</span>
                    </h1>

                    <p>
                        Cada destino tiene algo especial que contar.
                        Conserva tus experiencias, fotografías y recuerdos
                        en un solo lugar.
                    </p>

                    <div class="hero-buttons">
                        <button class="btn-primary" data-action="form">
                            Registrar un viaje →
                        </button>

                        <button class="btn-secondary" data-action="trips">
                            Explorar mis viajes
                        </button>
                    </div>

                    <div class="hero-note">
                        <span>🌎</span>
                        Tus aventuras merecen ser recordadas.
                    </div>
                </div>

                <div class="hero-image">
                    <div class="image-label">
                        <span>✦</span>
                        El comienzo de una historia
                    </div>
                </div>
            </section>

            <section class="intro-section">
                <div class="section-heading">
                    <span class="eyebrow">TU HISTORIA COMIENZA AQUÍ</span>
                    <h2>Un lugar para guardar cada aventura</h2>
                    <p>
                        TripBook transforma tus viajes en recuerdos
                        que podrás volver a visitar cuando quieras.
                    </p>
                </div>

                <div class="features-grid">
                    <article class="feature-card">
                        <div class="feature-icon">📸</div>
                        <h3>Guarda fotografías</h3>
                        <p>
                            Conserva las imágenes más especiales
                            de cada destino que visites.
                        </p>
                    </article>

                    <article class="feature-card">
                        <div class="feature-icon">📖</div>
                        <h3>Cuenta tu historia</h3>
                        <p>
                            Escribe tus experiencias y guarda
                            los momentos que hicieron especial tu viaje.
                        </p>
                    </article>

                    <article class="feature-card">
                        <div class="feature-icon">🌍</div>
                        <h3>Organiza tus destinos</h3>
                        <p>
                            Clasifica tus aventuras y encuentra
                            fácilmente cada recuerdo.
                        </p>
                    </article>
                </div>
            </section>

            <section class="cta-section">
                <div>
                    <span class="eyebrow">TU PRÓXIMA AVENTURA TE ESPERA</span>
                    <h2>¿Qué historia vamos a guardar hoy?</h2>
                    <p>Comienza a construir tu propio diario de viajes.</p>
                </div>

                <button class="btn-primary" data-action="form">
                    Crear mi primer recuerdo →
                </button>
            </section>
        `;

        this.updateNavigation("home");
    }

    renderForm(viaje?: Viaje): void {
        const content = document.querySelector("#content")!;

        const editar = Boolean(viaje);

        const imagen = viaje?.imagen ?? "";

        const categorias = [
            "Playa",
            "Montaña",
            "Ciudad",
            "Naturaleza",
            "Turismo cultural",
            "Otros"
        ];

        content.innerHTML = `
            <section class="form-section">
                <div class="form-heading">
                    <span class="eyebrow">✦ TUS RECUERDOS COMIENZAN AQUÍ</span>

                    <h1>${editar ? "Editar experiencia" : "Registrar un viaje"}</h1>

                    <p>
                        ${editar
                            ? "Actualiza los detalles de tu aventura."
                            : "Cuéntanos sobre ese lugar que hizo especial tu aventura."}
                    </p>
                </div>

                <form id="viaje-form" class="travel-form">
                    <div class="form-group">
                        <label for="nombre">Nombre del viaje *</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ej. Un fin de semana inolvidable"
                            maxlength="100"
                            required
                            value="${this.escape(viaje?.nombre ?? "")}"
                        >
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="pais">País *</label>
                            <input
                                type="text"
                                id="pais"
                                name="pais"
                                placeholder="Ej. El Salvador"
                                maxlength="80"
                                required
                                value="${this.escape(viaje?.pais ?? "")}"
                            >
                        </div>

                        <div class="form-group">
                            <label for="ciudad">Ciudad o destino *</label>
                            <input
                                type="text"
                                id="ciudad"
                                name="ciudad"
                                placeholder="Ej. El Tunco"
                                maxlength="100"
                                required
                                value="${this.escape(viaje?.ciudad ?? "")}"
                            >
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="fecha">Fecha de visita *</label>
                            <input
                                type="date"
                                id="fecha"
                                name="fecha"
                                required
                                value="${this.escape(viaje?.fecha ?? "")}"
                            >
                        </div>

                        <div class="form-group">
                            <label for="categoria">Categoría *</label>
                            <select id="categoria" name="categoria" required>
                                ${categorias.map(categoria => `
                                    <option
                                        value="${categoria}"
                                        ${viaje?.categoria === categoria ? "selected" : ""}
                                    >
                                        ${categoria}
                                    </option>
                                `).join("")}
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Calificación de tu experiencia *</label>

                        <div class="rating-selector" id="rating-selector">
                            ${[1, 2, 3, 4, 5].map(numero => `
                                <button
                                    type="button"
                                    class="rating-star ${numero <= (viaje?.calificacion ?? 5) ? "selected" : ""}"
                                    data-rating="${numero}"
                                >
                                    ★
                                </button>
                            `).join("")}
                        </div>

                        <input
                            type="hidden"
                            name="calificacion"
                            id="calificacion"
                            value="${viaje?.calificacion ?? 5}"
                        >
                    </div>

                    <div class="form-group">
                        <label for="descripcion">Descripción de tu experiencia *</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            rows="5"
                            maxlength="2000"
                            placeholder="Cuéntanos qué hiciste, qué lugares visitaste y qué fue lo que más te gustó..."
                            required
                        >${this.escape(viaje?.descripcion ?? "")}</textarea>
                    </div>

                    <div class="form-group">
                        <label>Fotografía de tu viaje</label>

                        <div class="photo-upload" id="photo-upload">
                            <input
                                type="file"
                                id="imagen"
                                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                                hidden
                            >

                            <div id="photo-preview">
                                ${imagen
                                    ? `<img src="${imagen}" class="preview-image" alt="Fotografía seleccionada">`
                                    : `
                                        <div class="upload-placeholder">
                                            <span class="camera-icon">📷</span>
                                            <h3>Agrega una fotografía</h3>
                                            <p>Selecciona una imagen desde tu dispositivo</p>
                                        </div>
                                    `}
                            </div>

                            <div class="photo-actions">
                                <button type="button" class="btn-upload" id="select-photo">
                                    Seleccionar fotografía
                                </button>

                                <button
                                    type="button"
                                    class="btn-remove-photo"
                                    id="remove-photo"
                                    ${imagen ? "" : "hidden"}
                                >
                                    Quitar fotografía
                                </button>
                            </div>

                            <span class="photo-info">JPG, JPEG, PNG o WEBP. Máximo 2 MB.</span>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn-secondary" data-action="trips">
                            Cancelar
                        </button>

                        <button type="submit" class="btn-primary">
                            ${editar ? "Guardar cambios" : "Guardar mi viaje"}
                        </button>
                    </div>
                </form>
            </section>
        `;

        this.updateNavigation("form");
    }

    renderTrips(
        viajes: Viaje[],
        busqueda: string,
        categoria: string,
        orden: string,
        total: number
    ): void {
        const content = document.querySelector("#content")!;

        content.innerHTML = `
            <section class="trips-section">
                <div class="trips-heading">
                    <div>
                        <span class="eyebrow">✦ TU COLECCIÓN PERSONAL</span>
                        <h1>Mis viajes</h1>
                        <p>Cada fotografía guarda un momento especial.</p>
                    </div>

                    <button class="btn-primary" data-action="form">
                        + Registrar viaje
                    </button>
                </div>

                <div class="trips-toolbar">
                    <div class="search-box">
                        <span>⌕</span>
                        <input
                            type="search"
                            id="search-input"
                            placeholder="Buscar por viaje, país o ciudad..."
                            value="${this.escape(busqueda)}"
                        >
                    </div>

                    <select id="filter-category">
                        <option value="Todas" ${categoria === "Todas" ? "selected" : ""}>Todas las categorías</option>
                        <option value="Playa" ${categoria === "Playa" ? "selected" : ""}>Playa</option>
                        <option value="Montaña" ${categoria === "Montaña" ? "selected" : ""}>Montaña</option>
                        <option value="Ciudad" ${categoria === "Ciudad" ? "selected" : ""}>Ciudad</option>
                        <option value="Naturaleza" ${categoria === "Naturaleza" ? "selected" : ""}>Naturaleza</option>
                        <option value="Turismo cultural" ${categoria === "Turismo cultural" ? "selected" : ""}>Turismo cultural</option>
                        <option value="Otros" ${categoria === "Otros" ? "selected" : ""}>Otros</option>
                    </select>

                    <select id="sort-date">
                        <option value="recientes" ${orden === "recientes" ? "selected" : ""}>Más recientes</option>
                        <option value="antiguos" ${orden === "antiguos" ? "selected" : ""}>Más antiguos</option>
                    </select>
                </div>

                <div class="trips-count">
                    Mostrando ${viajes.length} de ${total} viajes
                </div>

                <div class="trips-grid" id="trips-grid">
                    ${viajes.length
                        ? viajes.map(viaje => this.renderCard(viaje)).join("")
                        : `
                            <div class="empty-state">
                                <span>🌍</span>
                                <h2>${total === 0 ? "Tu diario está esperando historias" : "No encontramos viajes"}</h2>
                                <p>
                                    ${total === 0
                                        ? "Comienza registrando tu primera aventura."
                                        : "Prueba con otra búsqueda o cambia los filtros."}
                                </p>

                                ${total === 0
                                    ? `<button class="btn-primary" data-action="form">Registrar mi primer viaje</button>`
                                    : `<button class="btn-secondary" data-action="clear-filters">Limpiar filtros</button>`
                                }
                            </div>
                        `
                    }
                </div>
            </section>
        `;

        this.updateNavigation("trips");
    }

    private renderCard(viaje: Viaje): string {
        return `
            <article class="travel-card">
                <div class="card-image">
                    ${viaje.imagen
                        ? `<img src="${viaje.imagen}" alt="${this.escape(viaje.nombre)}">`
                        : `<div class="no-image">🌍</div>`
                    }

                    <span class="card-category">${this.escape(viaje.categoria)}</span>
                </div>

                <div class="card-content">
                    <div class="card-location">
                        📍 ${this.escape(viaje.ciudad)}, ${this.escape(viaje.pais)}
                    </div>

                    <h3>${this.escape(viaje.nombre)}</h3>

                    <div class="card-date">
                        ${this.formatearFecha(viaje.fecha)}
                    </div>

                    <div class="card-rating">
                        ${"★".repeat(viaje.calificacion)}
                        <span>${"☆".repeat(5 - viaje.calificacion)}</span>
                    </div>

                    <div class="card-actions">
                        <button data-action="details" data-id="${viaje.id}" class="action-details">
                            Ver detalles
                        </button>

                        <button data-action="edit" data-id="${viaje.id}" class="action-icon" title="Editar">
                            ✎
                        </button>

                        <button data-action="delete" data-id="${viaje.id}" class="action-icon delete-icon" title="Eliminar">
                            ✕
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    renderDetails(viaje: Viaje): void {
        const modal = document.querySelector("#modal-container")!;

        modal.innerHTML = `
            <div class="modal-overlay" id="modal-overlay">
                <div class="detail-modal">
                    <button class="modal-close" data-action="close-modal">×</button>

                    ${viaje.imagen
                        ? `<img src="${viaje.imagen}" class="detail-image" alt="${this.escape(viaje.nombre)}">`
                        : `<div class="detail-image no-image">🌍</div>`
                    }

                    <div class="detail-content">
                        <span class="eyebrow">${this.escape(viaje.categoria)}</span>

                        <h2>${this.escape(viaje.nombre)}</h2>

                        <div class="detail-location">
                            📍 ${this.escape(viaje.ciudad)}, ${this.escape(viaje.pais)}
                        </div>

                        <div class="detail-information">
                            <span>📅 ${this.formatearFecha(viaje.fecha)}</span>
                            <span class="card-rating">${"★".repeat(viaje.calificacion)}${"☆".repeat(5 - viaje.calificacion)}</span>
                        </div>

                        <h3>Mi experiencia</h3>

                        <p>${this.escape(viaje.descripcion).replace(/\n/g, "<br>")}</p>

                        <button class="btn-primary" data-action="close-modal">
                            Volver a mis viajes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showToast(mensaje: string, tipo: "success" | "error" = "success"): void {
        const container = document.querySelector("#toast-container")!;

        container.innerHTML = `
            <div class="toast ${tipo}">
                ${tipo === "success" ? "✓" : "!"}
                ${this.escape(mensaje)}
            </div>
        `;

        setTimeout(() => {
            container.innerHTML = "";
        }, 3000);
    }

    updateNavigation(actual: string): void {
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");

            const texto = link.textContent?.trim();

            if (
                (actual === "home" && texto === "Inicio") ||
                (actual === "form" && texto === "Registrar viaje") ||
                (actual === "trips" && texto === "Mis viajes")
            ) {
                link.classList.add("active");
            }
        });
    }

    private formatearFecha(fecha: string): string {
        if (!fecha) return "";

        const partes = fecha.split("-");

        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    private escape(texto: string): string {
        return texto.replace(/[&<>"']/g, caracter => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[caracter]!);
    }
}