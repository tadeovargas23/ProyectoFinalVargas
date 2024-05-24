// Esperar a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Variable para rastrear si los datos están mostrados o no
    let datosMostrados = false;

    // Array para almacenar los datos de los estudiantes
    const estudiantes = cargarEstudiantes();

    // Detectar el evento submit del formulario de estudiante
    document.getElementById("formulario-estudiante").addEventListener("submit", (event) => {
        event.preventDefault();
        agregarEstudiante();
        mostrarDatosGuardados(); // Mostrar los datos guardados después de agregar un estudiante
    });

    // Detectar el evento click del botón "Ver Datos Guardados"
    document.getElementById("ver-datos").addEventListener("click", () => {
        if (datosMostrados) {
            ocultarDatosGuardados();
        } else {
            mostrarDatosGuardados();
        }
    });

    // Detectar el evento click en cualquier parte del documento
    document.addEventListener("click", (event) => {
        // Si el elemento clickeado es un botón de borrar estudiante
        if (event.target.classList.contains("btn-borrar")) {
            const estudianteId = event.target.getAttribute("data-id");
            borrarEstudiante(estudianteId);
            mostrarDatosGuardados(); // Mostrar los datos actualizados después de borrar un estudiante
        }
    });

    // Función para cargar los estudiantes desde el almacenamiento local
    function cargarEstudiantes() {
        const estudiantesJSON = localStorage.getItem("estudiantes");
        return estudiantesJSON ? JSON.parse(estudiantesJSON) : [];
    }

    // Función para guardar los estudiantes en el almacenamiento local
    function guardarEstudiantes(estudiantes) {
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    }

    // Función para agregar un nuevo estudiante
    function agregarEstudiante() {
        // Obtener referencias a los elementos del formulario
        const nombreInput = document.getElementById("nombre");
        const apellidoInput = document.getElementById("apellido");
        const edadInput = document.getElementById("edad");
        const calificacionesInput = document.getElementById("calificaciones");

        // Obtener los valores del formulario
        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const edad = parseInt(edadInput.value);
        const calificaciones = calificacionesInput.value.split(",").map(calificacion => parseInt(calificacion));

        // Crear objeto estudiante con los datos ingresados
        const estudiante = { nombre, apellido, edad, calificaciones };

        // Agregar el estudiante al array de estudiantes
        estudiantes.push(estudiante);

        // Guardar los estudiantes actualizados en el almacenamiento local
        guardarEstudiantes(estudiantes);

        // Limpiar los campos del formulario
        nombreInput.value = "";
        apellidoInput.value = "";
        edadInput.value = "";
        calificacionesInput.value = "";
    }

    // Función para mostrar los datos guardados en el DOM
    function mostrarDatosGuardados() {
        const datosGuardadosDiv = document.getElementById("datos-guardados");
        const estudiantesGuardados = cargarEstudiantes();
        datosGuardadosDiv.innerHTML = `<h2>Datos Guardados</h2>`;
        estudiantesGuardados.forEach((estudiante, index) => {
            const estudianteDiv = document.createElement("div");
            estudianteDiv.classList.add("resultado");
            estudianteDiv.innerHTML = `
                <p>Nombre: ${estudiante.nombre} ${estudiante.apellido}</p>
                <p>Edad: ${estudiante.edad}</p>
                <p>Calificaciones: ${estudiante.calificaciones.join(", ")}</p>
                <button class="btn-borrar" data-id="${index}">Borrar</button>
            `;
            datosGuardadosDiv.appendChild(estudianteDiv);
        });
        datosMostrados = true;
        document.getElementById("ver-datos").textContent = "Ocultar Datos Guardados";
    }

    // Función para ocultar los datos guardados del DOM
    function ocultarDatosGuardados() {
        const datosGuardadosDiv = document.getElementById("datos-guardados");
        datosGuardadosDiv.innerHTML = "";
        datosMostrados = false;
        document.getElementById("ver-datos").textContent = "Ver Datos Guardados";
    }

    // Función para borrar un estudiante del array de estudiantes
    function borrarEstudiante(id) {
        estudiantes.splice(id, 1);
        guardarEstudiantes(estudiantes);
    }

    // Función para cargar los datos desde un archivo JSON local o desde una API externa
    async function cargarDatosDesdeJSON() {
        // Código para cargar datos desde JSON...
    }

    // Cargar los datos desde un archivo JSON local o desde una API externa
    cargarDatosDesdeJSON();
});
