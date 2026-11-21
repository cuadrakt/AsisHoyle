
const lista = document.getElementById("listaAsistencia");
const fechaInput = document.getElementById("fechaAsistencia");
const botonGuardar = document.getElementById("btnGuardarAsistencia");
const mensaje = document.getElementById("mensajeAsistencia");

// Obtener estudiantes registrados
let estudiantes = JSON.parse(
    localStorage.getItem("estudiantesAsisHoyle")
) || [];

// Obtener asistencias guardadas
let asistencias = JSON.parse(
    localStorage.getItem("asistenciasAsisHoyle")
) || [];

// Colocar la fecha actual
const hoy = new Date();
const fechaActual = new Date(
    hoy.getTime() - hoy.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

fechaInput.value = fechaActual;

// Mostrar estudiantes y sus estados
function mostrarAsistencia() {
    lista.innerHTML = "";

    if (estudiantes.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5">
                    No hay estudiantes registrados.
                    Primero ingresa al módulo de estudiantes.
                </td>
            </tr>
        `;
        return;
    }

    estudiantes.forEach(estudiante => {
        const registro = asistencias.find(a =>
            a.codigo === estudiante.codigo &&
            a.fecha === fechaInput.value
        );

        const estado = registro ? registro.estado : "Presente";

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${estudiante.codigo}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.grado}</td>
            <td>${estudiante.seccion}</td>
            <td>
                <select class="estado-asistencia"
                    data-codigo="${estudiante.codigo}">
                    <option value="Presente" ${estado === "Presente" ? "selected" : ""}>Presente</option>
                    <option value="Tardanza" ${estado === "Tardanza" ? "selected" : ""}>Tardanza</option>
                    <option value="Falta" ${estado === "Falta" ? "selected" : ""}>Falta</option>
                </select>
            </td>
        `;

        lista.appendChild(fila);
    });
}

// Cambiar la fecha
fechaInput.addEventListener("change", function() {
    mensaje.textContent = "";
    mostrarAsistencia();
});

// Guardar asistencia
botonGuardar.addEventListener("click", function() {
    if (estudiantes.length === 0) {
        mensaje.textContent = "Primero registra estudiantes.";
        return;
    }

    const fecha = fechaInput.value;

    if (!fecha) {
        mensaje.textContent = "Selecciona una fecha.";
        return;
    }

    const selectores = document.querySelectorAll(".estado-asistencia");

    selectores.forEach(selector => {
        const codigo = selector.dataset.codigo;
        const estudiante = estudiantes.find(e => e.codigo === codigo);

        if (!estudiante) return;

        asistencias = asistencias.filter(a =>
            !(a.codigo === codigo && a.fecha === fecha)
        );

        asistencias.push({
            codigo: estudiante.codigo,
            nombre: estudiante.nombre,
            grado: estudiante.grado,
            seccion: estudiante.seccion,
            fecha: fecha,
            estado: selector.value
        });
    });

    localStorage.setItem(
        "asistenciasAsisHoyle",
        JSON.stringify(asistencias)
    );

    mensaje.textContent = "Asistencia guardada correctamente.";
});

// Cerrar sesión
const cerrarSesion = document.getElementById("btnCerrarSesion");

if (cerrarSesion) {
    cerrarSesion.addEventListener("click", function() {
        localStorage.removeItem("usuarioAsisHoyle");
    });
}

// Mostrar información al abrir
mostrarAsistencia();
