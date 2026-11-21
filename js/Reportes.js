
const listaReportes = document.getElementById("listaReportes");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");
const mensaje = document.getElementById("mensajeReporte");

const asistencias = JSON.parse(
    localStorage.getItem("asistenciasAsisHoyle")
) || [];

function consultarReportes() {

    const inicio = fechaInicio.value;
    const fin = fechaFin.value;

    listaReportes.innerHTML = "";
    mensaje.textContent = "";

    if (inicio && fin && inicio > fin) {
        mensaje.textContent = "La fecha inicial no puede ser posterior a la fecha final.";

        actualizarTotales([]);
        return;
    }

    const registros = asistencias.filter(registro => {

        if (inicio && registro.fecha < inicio) return false;
        if (fin && registro.fecha > fin) return false;

        return true;
    });

    actualizarTotales(registros);

    if (registros.length === 0) {
        listaReportes.innerHTML = `
            <tr>
                <td colspan="6">No se encontraron registros de asistencia.</td>
            </tr>
        `;
        return;
    }

    registros.sort((a, b) =>
        b.fecha.localeCompare(a.fecha) ||
        a.nombre.localeCompare(b.nombre)
    );

    registros.forEach(registro => {

        const fila = document.createElement("tr");

        const datos = [
            registro.fecha,
            registro.codigo,
            registro.nombre,
            registro.grado,
            registro.seccion,
            registro.estado
        ];

        datos.forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        listaReportes.appendChild(fila);
    });
}

function actualizarTotales(registros) {

    const presentes = registros.filter(
        r => r.estado === "Presente"
    ).length;

    const tardanzas = registros.filter(
        r => r.estado === "Tardanza"
    ).length;

    const faltas = registros.filter(
        r => r.estado === "Falta"
    ).length;

    document.getElementById("totalRegistros").textContent =
        registros.length;

    document.getElementById("totalPresentes").textContent =
        presentes;

    document.getElementById("totalTardanzas").textContent =
        tardanzas;

    document.getElementById("totalFaltas").textContent =
        faltas;
}

// Consultar registros
document.getElementById("btnConsultar").addEventListener(
    "click",
    consultarReportes
);

// Limpiar filtros
document.getElementById("btnLimpiar").addEventListener(
    "click",
    function() {
        fechaInicio.value = "";
        fechaFin.value = "";
        consultarReportes();
    }
);

// Cerrar sesión
const cerrarSesion = document.getElementById("btnCerrarSesion");

if (cerrarSesion) {
    cerrarSesion.addEventListener("click", function() {
        localStorage.removeItem("usuarioAsisHoyle");
    });
}

// Mostrar todos los registros al abrir
consultarReportes();
