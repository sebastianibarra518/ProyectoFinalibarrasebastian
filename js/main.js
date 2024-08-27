const turnarios = document.getElementById("turnos");
const formularioUsuario = document.getElementById("usuarios");

function iniciarTurnario() {
    turnarios.innerHTML = "";

    const mensajeBienvenida = document.createElement("h1");
    const contenedorTurnos = document.createElement("div");
    const etiquetaTurno = document.createElement("label");
    const seleccionDeTurnos = document.createElement("select");
    const botonReservar = document.createElement("button");
    const contenedorReservados = document.createElement("div");
    const botonReiniciar = document.createElement("button");

    etiquetaTurno.textContent = "Selecciona un turno:";
    botonReservar.textContent = "Reservar Turno";
    botonReiniciar.textContent = "Borrar Reservas";

    turnarios.appendChild(mensajeBienvenida);
    turnarios.appendChild(contenedorTurnos);
    turnarios.appendChild(etiquetaTurno);
    turnarios.appendChild(seleccionDeTurnos);
    turnarios.appendChild(botonReservar);
    turnarios.appendChild(contenedorReservados);
    turnarios.appendChild(botonReiniciar);

    const turnosDisponibles = {
        1: "08:00 a 09:00",
        2: "09:00 a 10:00",
        3: "10:00 a 11:00",
        4: "11:00 a 12:00",
        5: "12:00 a 13:00",
        6: "13:00 a 14:00",
        7: "14:00 a 15:00",
        8: "15:00 a 16:00",
    };

    let turnosReservados = JSON.parse(localStorage.getItem("turnosReservados")) || [];

    mensajeBienvenida.textContent = `Bienvenido. Los turnos disponibles son:`;

    function mostrarTurnos() {
        contenedorTurnos.innerHTML = "";
        seleccionDeTurnos.innerHTML = "";

        for (let turno in turnosDisponibles) {
            const turnoText = `${turno}: ${turnosDisponibles[turno]}`;
            const p = document.createElement("p");
            p.textContent = turnoText;
            contenedorTurnos.appendChild(p);

            const option = document.createElement("option");
            option.value = turno;
            option.textContent = turnoText;
            seleccionDeTurnos.appendChild(option);
        }
    }

    function mostrarFormularioUsuario(turnoSeleccionado) {
        formularioUsuario.innerHTML = "";

        const etiquetaNombre = document.createElement("label");
        const campoNombre = document.createElement("input");
        const etiquetaApellido = document.createElement("label");
        const campoApellido = document.createElement("input");
        const botonEnviar = document.createElement("button");

        etiquetaNombre.textContent = "Nombre:";
        etiquetaApellido.textContent = "Apellido:";
        botonEnviar.textContent = "Enviar";

        campoNombre.type = "text";
        campoNombre.id = "nombre";
        campoApellido.type = "text";
        campoApellido.id = "apellido";

        formularioUsuario.appendChild(etiquetaNombre);
        formularioUsuario.appendChild(campoNombre);
        formularioUsuario.appendChild(etiquetaApellido);
        formularioUsuario.appendChild(campoApellido);
        formularioUsuario.appendChild(botonEnviar);

        botonEnviar.addEventListener("click", () => {
            const nombre = campoNombre.value.trim().toUpperCase();
            const apellido = campoApellido.value.trim().toUpperCase();

            if (nombre && apellido) {
                const nombreCompleto = `${nombre} ${apellido}`;
                reservarTurno(turnoSeleccionado, nombreCompleto);
                mostrarReservados();
                formularioUsuario.innerHTML = ""; 
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, ingrese su nombre y apellido.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    }

    function reservarTurno(turno, nombreCompleto) {
        if (turnosDisponibles[turno] && !turnosReservados.some(reserva => reserva.turno === turno)) {
            turnosReservados.push({ turno, nombreCompleto });
            guardarTurnosEnLocalStorage();
            Swal.fire({
                title: '¡Turno Reservado!',
                text: `Has reservado el turno de ${turnosDisponibles[turno]}`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
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
                
                const cardContent = document.createElement("p");
                cardContent.textContent = `Turno reservado: ${turnosDisponibles[reserva.turno]} por ${reserva.nombreCompleto}`;
                
                card.appendChild(cardContent);
                contenedorReservados.appendChild(card);
            });
        } else {
            contenedorReservados.textContent = 'No se han reservado turnos.';
        }
    }

    function guardarTurnosEnLocalStorage() {
        localStorage.setItem("turnosReservados", JSON.stringify(turnosReservados));
    }

    botonReiniciar.addEventListener("click", () => {
        turnosReservados = [];
        localStorage.removeItem("turnosReservados");
        mostrarReservados();
        Swal.fire({
            title: 'Reinicio de Reservas',
            text: 'Todas las reservas han sido borradas.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        mostrarTurnos();
    });

    botonReservar.addEventListener("click", () => {
        const turnoSeleccionado = seleccionDeTurnos.value;
        if (turnoSeleccionado) {
            mostrarFormularioUsuario(turnoSeleccionado);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, seleccione un turno.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });

    mostrarTurnos();
    mostrarReservados();
}

formularioUsuario.style.display = "block";
turnarios.style.display = "block";

iniciarTurnario();

