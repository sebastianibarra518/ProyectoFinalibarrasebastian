
let nombre = prompt("escriba su nombre").toUpperCase();
let apellido = prompt("escriba su apellido").toUpperCase();
let nombreCompleto = nombre + " " + apellido;

let turno = "Bienvenido, " + nombreCompleto + " quieres sacar un turno para taller TuMotito? tienes UNO, DOS, TRES, CUATRO y CINCO"
alert(turno);
                
        function sacarTurno(numeroDeTurno){
            const mensaje = "sacaste el turno " + numeroDeTurno;
            alert(mensaje)
        };

        let turnosReservados = 0;

        while(turnosReservados < 1){
            const turno = prompt("Que turno vas a querer?").toUpperCase();
            if(turno === "UNO" || turno === "DOS" || turno === "TRES" || turno === "CUATRO" || turno === "CINCO" ){
                sacarTurno(turno);
                turnosReservados += 1
            } else {
                alert("no existe ese turno " + turno);
            };
        };

        alert("listo tu turno esta reservado");
        







