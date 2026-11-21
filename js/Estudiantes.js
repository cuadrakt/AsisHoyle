
const formulario = document.getElementById("formEstudiante");
const lista = document.getElementById("listaEstudiantes");
const mensaje = document.getElementById("mensajeEstudiante");

let estudiantes = JSON.parse(
    localStorage.getItem("estudiantesAsisHoyle")
) || [];

function guardarEstudiantes() {
    localStorage.setItem(
        "estudiantesAsisHoyle",
        JSON.stringify(estudiantes)
    );
}

function mostrarEstudiantes() {
    lista.innerHTML = "";

    estudiantes.forEach((estudiante, indice) => {
        const fila = document.createElement("tr");

        [estudiante.codigo, estudiante.nombre,
         estudiante.grado, estudiante.seccion].forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const celdaAccion = document.createElement("td");
        const boton = document.createElement("button");

        boton.textContent = "Eliminar";
        boton.className = "btn-eliminar";
        boton.type = "button";

        boton.addEventListener("click", () => {
            estudiantes.splice(indice, 1);
            guardarEstudiantes();
            mostrarEstudiantes();
        });

        celdaAccion.appendChild(boton);
        fila.appendChild(celdaAccion);
        lista.appendChild(fila);
    });
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const grado = document.getElementById("grado").value.trim();
    const seccion = document.getElementById("seccion").value.trim();

    if (estudiantes.some(e => e.codigo === codigo)) {
        mensaje.textContent = "Ese código ya está registrado.";
        return;
    }

    estudiantes.push({ codigo, nombre, grado, seccion });

    guardarEstudiantes();
    mostrarEstudiantes();
    formulario.reset();

    mensaje.textContent = "Estudiante registrado correctamente.";
});

mostrarEstudiantes();

const cerrarSesion = document.getElementById("btnCerrarSesion");

if (cerrarSesion) {
    cerrarSesion.addEventListener("click", function() {
        localStorage.removeItem("usuarioAsisHoyle");
    });
}
