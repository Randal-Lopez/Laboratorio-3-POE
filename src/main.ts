import "./styles/styles.css";

import { inicializarDB } from "./db/database";
import { ViajeView } from "./views/ViajeView";
import { ViajeController } from "./controllers/ViajeController";

async function iniciarAplicacion(): Promise<void> {
    try {
        await inicializarDB();

        const view = new ViajeView();

        const controller = new ViajeController(view);

        controller.iniciar();

    } catch (error) {
        console.error("Error al iniciar TripBook:", error);

        document.querySelector("#app")!.innerHTML = `
            <div style="padding: 50px; text-align: center;">
                <h1>No se pudo iniciar TripBook</h1>
                <p>Comprueba tu conexión e intenta nuevamente.</p>
            </div>
        `;
    }
}

iniciarAplicacion();