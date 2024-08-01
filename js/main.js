const nombre = prompt("Escribe tu nombre").toUpperCase();
const apellido = prompt("Escribe tu apellido").toUpperCase();
const nombreCompleto = `${nombre} ${apellido}`;

const turnosDisponibles = {
    UNO: "Turno 1",
    DOS: "Turno 2",
    TRES: "Turno 3",
    CUATRO: "Turno 4",
    CINCO: "Turno 5",
    SEIS: "Turno 6",
    SIETE: "Turno 7",
    OCHO: "Turno 8",
    NUEVE: "Turno 9",
    DIEZ: "Turno 10",
};

function mostrarTurnos() {
    const mensaje = `Bienvenido, ${nombreCompleto}. Los turnos disponibles son: ${Object.keys(turnosDisponibles).join(', ')}.`;
    alert(mensaje);
}

const turnosReservados = [];


function reservarTurno(turno) {
    if (turnosDisponibles[turno] && !turnosReservados.includes(turno)) {
        turnosReservados.push(turno);
        return `Has reservado el ${turnosDisponibles[turno]}`;
    } else if (turnosReservados.includes(turno)) {
        return `El turno "${turnosDisponibles[turno]}" ya ha sido reservado.`;
    } else {
        return `No existe el turno "${turno}".`;
    }
}

mostrarTurnos();

let turnoSeleccionado;
do {
    turnoSeleccionado = prompt("¿Qué turno quieres reservar? (Escribe 'SALIR' para terminar)").toUpperCase();
    
    if (turnoSeleccionado === 'SALIR') {
        break;
    }

    const mensaje = reservarTurno(turnoSeleccionado);
    alert(mensaje);
} while (turnoSeleccionado !== 'SALIR');

if (turnosReservados.length > 0) {

    const descripciones = [];

    turnosReservados.forEach(turno => {
        descripciones.push(turnosDisponibles[turno]);
    });

    alert(`Listo, tus turnos reservados son: ${descripciones.join(', ')}`);
    console.log('Turnos reservados:', descripciones);
} else {
    alert('No se han reservado turnos.');
}








