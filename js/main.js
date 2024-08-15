    const turnarios = document.getElementById("turnos");
    const formularioUsuario = document.getElementById("usuarios");

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
            iniciarTurnario(nombreCompleto);
            formularioUsuario.style.display = "none";
            turnarios.style.display = "block";
        } else {
            alert("Por favor, ingrese su nombre y apellido.");
        }
    });

    function iniciarTurnario(nombreCompleto) {
        const mensajeBienvenida = document.createElement("h1");
        const contenedorTurnos = document.createElement("div");
        const formularioReserva = document.createElement("div");
        const etiquetaTurno = document.createElement("label");
        const seleccionDeTurnos = document.createElement("select");
        const botonReservar = document.createElement("button");
        const contenedorReservados = document.createElement("div");
        const botonOtroTurno = document.createElement("button");
        const botonReiniciar = document.createElement("button"); 
        const botonSalir = document.createElement("button"); 

        etiquetaTurno.textContent = "Selecciona un turno:";
        botonReservar.textContent = "Reservar Turno";
        botonOtroTurno.textContent = "Reservar otro turno";
        botonOtroTurno.style.display = "none";
        botonReiniciar.textContent = "Reiniciar Turnos"; 
        botonSalir.textContent = "Salir"; 

        formularioReserva.appendChild(etiquetaTurno);
        formularioReserva.appendChild(seleccionDeTurnos);
        formularioReserva.appendChild(botonReservar);
        turnarios.appendChild(mensajeBienvenida);
        turnarios.appendChild(contenedorTurnos);
        turnarios.appendChild(formularioReserva);
        turnarios.appendChild(contenedorReservados);
        turnarios.appendChild(botonOtroTurno);
        turnarios.appendChild(botonReiniciar); 
        turnarios.appendChild(botonSalir); 

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

        mensajeBienvenida.textContent = `Bienvenido, ${nombreCompleto}. Los turnos disponibles son:`;

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

            formularioReserva.style.display = "block";
        }

        function reservarTurno(turno) {
            if (turnosDisponibles[turno] && !turnosReservados.some(reserva => reserva.turno === turno)) {
                turnosReservados.push({ turno, nombreCompleto });
                guardarTurnosEnLocalStorage();
                return `Has reservado el turno de ${turnosDisponibles[turno]}`;
            } else if (turnosReservados.some(reserva => reserva.turno === turno)) {
                return `El turno de ${turnosDisponibles[turno]} ya ha sido reservado.`;
            } else {
                return `No existe el turno "${turno}".`;
            }
        }

        botonReservar.addEventListener("click", () => {
            const turnoSeleccionado = seleccionDeTurnos.value;
            const mensaje = reservarTurno(turnoSeleccionado);
            alert(mensaje);

            mostrarReservados();

            botonOtroTurno.style.display = "block";
        });

        botonOtroTurno.addEventListener("click", () => {
            formularioReserva.style.display = "block";
            botonOtroTurno.style.display = "none";
        });

        botonReiniciar.addEventListener("click", () => {
            turnosReservados = [];
            localStorage.removeItem("turnosReservados");
            mostrarReservados();
            alert("Todos los turnos han sido reiniciados.");
            mostrarTurnos();
            botonOtroTurno.style.display = "none";
        });

        botonSalir.addEventListener("click", () => {
            turnarios.style.display = "none";
            formularioUsuario.style.display = "block";
        });

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

        mostrarTurnos();
        mostrarReservados();
    }

    formularioUsuario.style.display = "block";
    turnarios.style.display = "none";

