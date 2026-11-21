// Obtener el formulario
const loginForm = document.getElementById("loginForm");

// Obtener el espacio para mostrar mensajes
const mensaje = document.getElementById("mensaje");

// Detectar cuando el usuario envía el formulario
loginForm.addEventListener("submit", function(event) {

    // Evitar que la página se recargue
    event.preventDefault();

    // Obtener los datos ingresados
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value;

    // Validar que los campos no estén vacíos
    if (usuario === "" || password === "") {
        mensaje.textContent = "Por favor, completa todos los campos.";
        mensaje.style.color = "#DC2626";
        return;
    }

    // Credenciales de demostración
    if (usuario === "admin" && password === "12345") {

        mensaje.textContent = "Acceso correcto. Bienvenido a AsisHoyle.";
        mensaje.style.color = "#15803D";

        // Guardar el usuario de demostración
        localStorage.setItem("usuarioAsisHoyle", usuario);

        // Dirigir al panel principal
        setTimeout(function() {
            window.location.href = "pages/dashboard.html";
        }, 1000);

    } else {

        mensaje.textContent = "Usuario o contraseña incorrectos.";
        mensaje.style.color = "#DC2626";

    }

});
