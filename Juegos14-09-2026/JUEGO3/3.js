const simbolos = ["circulo", "cuadrado", "triangulo", "estrella"];

function meclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temporal = array[i];
        array[i] = array[j];
        array[j] = temporal;
    }
    return array;
}

let mazo = meclar(simbolos.concat(simbolos));

const tablero = document.getElementById("tableroJuego3");
const contadorMovimientos = document.getElementById("movimientosJuego3");
const mensajeJuego3 = document.getElementById("mensajeJuego3");
const btnReiniciarJuego3 = document.getElementById("btnReiniciarJuego3");

let cartasVolteadas = [];
let bloqueado = false;
let movimientos = 0;
let paresEncontrados = 0;

// Se extrajo como función global independiente y se cerraron las etiquetas <img>
function crearImagenSimbolo(simbolo) {
    if (simbolo === "circulo") {
        return "<img src='https://media.tenor.com/658FxXh-QqMAAAAM/green-alien-cat-green-alien-cat-meme.gif' alt='fantasma'>";
    }
    if (simbolo === "cuadrado") {
        return "<img src='https://media.tenor.com/5pc4s5CODGgAAAAj/calabaza-emocion.gif' alt='calabaza'>";
    }
    if (simbolo === "triangulo") {
        return "<img src='https://media.tenor.com/lwHgtkwbOxQAAAAj/que-divertido-pocoyo.gif' alt='Pocoyo'>";
    }
    return "<img src='https://i.pinimg.com/originals/cc/a8/5d/cca85d0ac44cb4ac03cf55504526fe6a.gif' alt='Pollito'>";
}

function crearTablero() {
    tablero.innerHTML = "";

    mazo.forEach(function (simbolo, indice) {
        const carta = document.createElement("div");
        carta.className = "carta";
        carta.dataset.simbolo = simbolo;
        carta.dataset.indice = indice;

        const interior = document.createElement("div");
        interior.className = "carta-interior";

        const frente = document.createElement("div");
        frente.className = "carta-cara carta-frente";
        frente.innerHTML = "<svg viewBox='0 0 40 40' width='28' height='28'><circle cx='20' cy='20' r='16' fill='none' stroke='#ffffff' stroke-width='3' stroke-dasharray='4 4'></circle></svg>";

        const reverso = document.createElement("div");
        reverso.className = "carta-cara carta-reverso";
        reverso.innerHTML = crearImagenSimbolo(simbolo);

        interior.appendChild(frente);
        interior.appendChild(reverso);
        carta.appendChild(interior);
        tablero.appendChild(carta);
    });
}

crearTablero();

tablero.addEventListener("click", function (evento) {
    const carta = evento.target.closest(".carta");

    if (!carta) {
        return;
    }
    if (bloqueado) {
        return;
    }
    if (carta.classList.contains("volteada")) {
        return;
    }
    if (carta.classList.contains("emparejada")) {
        return;
    }

    carta.classList.add("volteada");
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
        movimientos = movimientos + 1;
        contadorMovimientos.textContent = movimientos;
        compararCartas();
    }
});

function compararCartas() {
    const primera = cartasVolteadas[0];
    const segunda = cartasVolteadas[1];

    if (primera.dataset.simbolo === segunda.dataset.simbolo) {
        primera.classList.add("emparejada");
        segunda.classList.add("emparejada");
        cartasVolteadas = [];
        paresEncontrados = paresEncontrados + 1;

        if (paresEncontrados === simbolos.length) {
            mensajeJuego3.textContent = "Ganaste. Encontraste todas las parejas en " + movimientos + " movimientos.";
        }
    } else {
        bloqueado = true;
        setTimeout(function () {
            primera.classList.remove("volteada");
            segunda.classList.remove("volteada");
            cartasVolteadas = [];
            bloqueado = false;
        }, 900);
    }
}

btnReiniciarJuego3.addEventListener("click", function () {
    mazo = meclar(simbolos.concat(simbolos));
    movimientos = 0;
    paresEncontrados = 0;
    cartasVolteadas = [];
    bloqueado = false;
    contadorMovimientos.textContent = "0";
    mensajeJuego3.textContent = "";
    crearTablero();
});