const turnarios = document.getElementById("turnos");
const formularioUsuario = document.getElementById("usuarios");
let turnosDisponibles = {};

function iniciarTurnario() {
    turnarios.innerHTML = "";

    const mensajeBienvenida = document.createElement("h1");
    const botonMostrarOcultar = document.createElement("button");
    const contenedorTurnos = document.createElement("div");
    const botonReiniciar = document.createElement("button");
    const contenedorReservados = document.createElement("div");

    mensajeBienvenida.textContent = ``;
    botonMostrarOcultar.textContent = "Mostrar Turnos Disponibles";
    botonReiniciar.textContent = "Borrar Reservas";

    turnarios.appendChild(mensajeBienvenida);
    turnarios.appendChild(botonMostrarOcultar);
    turnarios.appendChild(contenedorTurnos);
    turnarios.appendChild(contenedorReservados);
    turnarios.appendChild(botonReiniciar);

    contenedorTurnos.style.display = "none"; 

    let turnosReservados = JSON.parse(localStorage.getItem("turnosReservados")) || [];
    let turnoSeleccionado = null;  

    function mostrarTurnos() {
        contenedorTurnos.innerHTML = "";
        contenedorTurnos.className = "contenedor-turnos"; 
    
        for (let turno in turnosDisponibles) {
            const turnoText = `${turno}: ${turnosDisponibles[turno]}`;
            const turnoContainer = document.createElement("div");
            turnoContainer.className = "turno-container"; 
            turnoContainer.textContent = turnoText;
    
            if (turnosReservados.some(reserva => reserva.turno === turno)) {
                turnoContainer.classList.add("reservado"); 
            }
    
            contenedorTurnos.appendChild(turnoContainer);
    
            turnoContainer.addEventListener("click", () => {
                const elementosTurno = document.querySelectorAll('.turno-container');
                elementosTurno.forEach(el => el.classList.remove("seleccionado"));
    
                turnoContainer.classList.add("seleccionado"); 
                turnoSeleccionado = turno; 
                mostrarFormularioUsuario(turnoSeleccionado); 
            });
        }
    }

    function mostrarFormularioUsuario(turnoSeleccionado) {
        formularioUsuario.innerHTML = "";
    
        formularioUsuario.className = "formulario-usuario";
    
        const etiquetaNombre = document.createElement("label");
        const campoNombre = document.createElement("input");
        const etiquetaApellido = document.createElement("label");
        const campoApellido = document.createElement("input");
        const etiquetaDNI = document.createElement("label");
        const campoDNI = document.createElement("input");
        const etiquetaEmail = document.createElement("label");
        const campoEmail = document.createElement("input");
        const botonEnviar = document.createElement("button");
        const botonCancelar = document.createElement("button");
    
        etiquetaNombre.textContent = "Nombre:";
        etiquetaApellido.textContent = "Apellido:";
        etiquetaDNI.textContent = "DNI:";
        etiquetaEmail.textContent = "Email:";
        botonEnviar.textContent = "Enviar";
        botonCancelar.textContent = "Cancelar";
    
        campoNombre.type = "text";
        campoNombre.id = "nombre";
        campoApellido.type = "text";
        campoApellido.id = "apellido";
        campoDNI.type = "text";
        campoDNI.id = "dni";
        campoEmail.type = "email";
        campoEmail.id = "email";
    
        formularioUsuario.style.display = "flex";
        formularioUsuario.style.flexDirection = "column";
        formularioUsuario.style.alignItems = "center";
        formularioUsuario.style.justifyContent = "center";
        formularioUsuario.style.width = "300px";
        formularioUsuario.style.margin = "20px auto";
        formularioUsuario.style.padding = "20px";
        formularioUsuario.style.border = "1px solid #ccc";
        formularioUsuario.style.borderRadius = "10px";
        formularioUsuario.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        formularioUsuario.style.backgroundColor = "#f9f9f9";
    
        etiquetaNombre.style.marginBottom = "10px";
        etiquetaApellido.style.marginBottom = "10px";
        etiquetaDNI.style.marginBottom = "10px";
        etiquetaEmail.style.marginBottom = "10px";
    
        campoNombre.style.width = "100%";
        campoNombre.style.padding = "10px";
        campoNombre.style.marginBottom = "15px";
        campoNombre.style.border = "1px solid #ccc";
        campoNombre.style.borderRadius = "5px";
        campoNombre.style.boxSizing = "border-box";
    
        campoApellido.style.width = "100%";
        campoApellido.style.padding = "10px";
        campoApellido.style.marginBottom = "15px";
        campoApellido.style.border = "1px solid #ccc";
        campoApellido.style.borderRadius = "5px";
        campoApellido.style.boxSizing = "border-box";
    
        campoDNI.style.width = "100%";
        campoDNI.style.padding = "10px";
        campoDNI.style.marginBottom = "15px";
        campoDNI.style.border = "1px solid #ccc";
        campoDNI.style.borderRadius = "5px";
        campoDNI.style.boxSizing = "border-box";
    
        campoEmail.style.width = "100%";
        campoEmail.style.padding = "10px";
        campoEmail.style.marginBottom = "15px";
        campoEmail.style.border = "1px solid #ccc";
        campoEmail.style.borderRadius = "5px";
        campoEmail.style.boxSizing = "border-box";
    
        botonEnviar.style.padding = "10px 20px";
        botonEnviar.style.border = "none";
        botonEnviar.style.borderRadius = "5px";
        botonEnviar.style.backgroundColor = "#007bff";
        botonEnviar.style.color = "#fff";
        botonEnviar.style.cursor = "pointer";
        botonEnviar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
    
        botonCancelar.style.padding = "10px 20px";
        botonCancelar.style.border = "none";
        botonCancelar.style.borderRadius = "5px";
        botonCancelar.style.backgroundColor = "rgba(220, 53, 69, 0.8)";
        botonCancelar.style.color = "rgba(255, 255, 255, 0.9)"; 
        botonCancelar.style.cursor = "pointer";
        botonCancelar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
        botonCancelar.style.marginTop = "10px";
        botonCancelar.style.fontSize = "16px";
        botonCancelar.style.transition = "background-color 0.3s ease";
    
        botonEnviar.addEventListener("mouseenter", () => {
            botonEnviar.style.backgroundColor = "#0056b3";
        });
    
        botonEnviar.addEventListener("mouseleave", () => {
            botonEnviar.style.backgroundColor = "#007bff";
        });
    
        botonCancelar.addEventListener("mouseenter", () => {
            botonCancelar.style.backgroundColor = "rgba(220, 53, 69, 1)"; 
        });
    
        botonCancelar.addEventListener("mouseleave", () => {
            botonCancelar.style.backgroundColor = "rgba(220, 53, 69, 0.8)"; 
        });
    
        botonCancelar.addEventListener("click", () => {
            formularioUsuario.innerHTML = ""; 
        });
    
        formularioUsuario.appendChild(etiquetaNombre);
        formularioUsuario.appendChild(campoNombre);
        formularioUsuario.appendChild(etiquetaApellido);
        formularioUsuario.appendChild(campoApellido);
        formularioUsuario.appendChild(etiquetaDNI);
        formularioUsuario.appendChild(campoDNI);
        formularioUsuario.appendChild(etiquetaEmail);
        formularioUsuario.appendChild(campoEmail);
        formularioUsuario.appendChild(botonEnviar);
        formularioUsuario.appendChild(botonCancelar);
    
        function enviarFormulario() {
            const nombre = campoNombre.value.trim().toUpperCase();
            const apellido = campoApellido.value.trim().toUpperCase();
            const dni = campoDNI.value.trim();
            const email = campoEmail.value.trim().toLowerCase();
    
            if (nombre && apellido && dni && email) {
                const nombreCompleto = `${nombre} ${apellido}`;
                reservarTurno(turnoSeleccionado, nombreCompleto, dni, email);
                mostrarReservados();
                formularioUsuario.innerHTML = ""; 
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, complete todos los campos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    
        botonEnviar.addEventListener("click", enviarFormulario);
    }
    
    function reservarTurno(turno, nombreCompleto, dni, email) {
        if (turnosDisponibles[turno] && !turnosReservados.some(reserva => reserva.turno === turno)) {
            turnosReservados.push({ turno, nombreCompleto, dni, email });
            guardarTurnosEnLocalStorage();
    
            Swal.fire({
                title: '¡Turno Reservado!',
                text: `Has reservado el turno de ${turnosDisponibles[turno]}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1200
            });
    
            mostrarTurnos(); 
            mostrarReservados();
        } else {
            Swal.fire({
                title: 'Turno no disponible',
                text: `El turno de ${turnosDisponibles[turno]} ya ha sido reservado.`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }
    
    function mostrarReservados() {
        contenedorReservados.innerHTML = "";
        if (turnosReservados.length > 0) {
            turnosReservados.forEach(reserva => {
                const card = document.createElement("div");
                card.className = "card";
                card.style.border = "1px solid #ccc";
                card.style.padding = "10px";
                card.style.margin = "10px 0";
                card.style.borderRadius = "5px";
                card.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
                card.style.backgroundColor = "#f8f9fa";
                card.style.display = "flex";
                card.style.justifyContent = "space-between";
                card.style.alignItems = "center";

                const turnoTexto = document.createElement("span");
                turnoTexto.textContent = `${turnosDisponibles[reserva.turno]} - ${reserva.nombreCompleto}`;
                turnoTexto.style.fontWeight = "bold";

                card.appendChild(turnoTexto);
                contenedorReservados.appendChild(card);
            });
        } else {
            const mensaje = document.createElement("p");
            mensaje.textContent = "No hay turnos reservados.";
            mensaje.classList.add("sin-turnos");
            contenedorReservados.appendChild(mensaje);
        }
    }

    function guardarTurnosEnLocalStorage() {
        localStorage.setItem("turnosReservados", JSON.stringify(turnosReservados));
    }

    botonMostrarOcultar.addEventListener("click", () => {
        if (contenedorTurnos.style.display === "none") {
            contenedorTurnos.style.display = "grid";
            mostrarTurnos();
            botonMostrarOcultar.textContent = "Ocultar Turnos Disponibles";
        } else {
            contenedorTurnos.style.display = "none";
            botonMostrarOcultar.textContent = "Mostrar Turnos Disponibles";
        }
    });

    botonReiniciar.addEventListener("click", () => {
        const reservasGuardadas = JSON.parse(localStorage.getItem("turnosReservados"));
        if (!reservasGuardadas || reservasGuardadas.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No hay reservas',
                text: 'No hay reservas para borrar.',
            });
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Esto borrará todas las reservas.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar reservas',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    turnosReservados = [];
                    guardarTurnosEnLocalStorage();
                    mostrarTurnos();
                    mostrarReservados();
                    Swal.fire({
                        title: 'Reservas Borradas',
                        text: 'Todas las reservas han sido eliminadas.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1200
                    });
                }
            });
        }
    });

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        turnosDisponibles = data.turnos;
        mostrarTurnos(); 
        mostrarReservados();
    })
    .catch(error => console.error('Error al cargar los turnos:', error));
}

formularioUsuario.style.display = "block";
turnarios.style.display = "block";

iniciarTurnario();

