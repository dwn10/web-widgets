
// Variables y objetos necesarios para el funcionamiento del código
const $canvas = document.querySelector("#canvas"),
    $btnDescargar = document.querySelector("#btnDescargar"),
    $btnLimpiar = document.querySelector("#btnLimpiar"),
    $btnGenerarDocumento = document.querySelector("#btnGenerarDocumento");
const contexto = $canvas.getContext("2d"); // Define el grosor de la línea.
const COLOR_PINCEL = "black"; // Define el color del pincel.
const COLOR_FONDO = "white"; // Define el color de fondo del canvas.
const GROSOR = 2; // Define el grosor de la línea.

// Declara cuatro variables para almacenar las coordenadas de los puntos dibujados.
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
const obtenerXReal = (clientX) => clientX - $canvas.getBoundingClientRect().left;
const obtenerYReal = (clientY) => clientY - $canvas.getBoundingClientRect().top;

let haComenzadoDibujo = false; // Declara una variable para indicar si el usuario está dibujando.

// Este segmento define una función para limpiar el canvas.
const limpiarCanvas = () => {
    // Colocar color blanco en fondo de canvas
    contexto.fillStyle = COLOR_FONDO;
    contexto.fillRect(0, 0, $canvas.width, $canvas.height);
};
limpiarCanvas();
$btnLimpiar.onclick = limpiarCanvas;

// Este segmento agrega un evento al botón #btnDescargar para que,
// al hacer clic en él, se descargue el canvas como una imagen en formato PNG.
$btnDescargar.onclick = () => {
    const enlace = document.createElement('a');
    enlace.download = "Firma.png";
    enlace.href = $canvas.toDataURL();
    enlace.click();
};

// Este segmento exporta una función para obtener la imagen
window.obtenerImagen = () => {
    return $canvas.toDataURL();
};

// Este segmento agrega un evento al botón #btnGenerarDocumento para que,
// al hacer clic en él, se abra un nuevo documento con la imagen del canvas.
$btnGenerarDocumento.onclick = () => {
    window.open("documento.html");
};

// Este segmento define las funciones que se ejecutan al hacer clic o tocar el canvas.
const onClicOToqueIniciado = evento => {
    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.fillStyle = COLOR_PINCEL;
    contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
    contexto.closePath();
    haComenzadoDibujo = true;
}

const onMouseODedoMovido = evento => {
    evento.preventDefault(); // Prevenir scroll en móviles
    if (!haComenzadoDibujo) {
        return;
    }
    // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo
    let target = evento;
    if (evento.type.includes("touch")) {
        target = evento.touches[0];
    }
    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(target.clientX);
    yActual = obtenerYReal(target.clientY);
    contexto.beginPath();
    contexto.moveTo(xAnterior, yAnterior);
    contexto.lineTo(xActual, yActual);
    contexto.strokeStyle = COLOR_PINCEL;
    contexto.lineWidth = GROSOR;
    contexto.stroke();
    contexto.closePath();
}

const onMouseODedoLevantado = () => {
    haComenzadoDibujo = false;
};

// Lo demás tiene que ver con pintar sobre el canvas en los eventos del mouse
["mousedown", "touchstart"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, onClicOToqueIniciado);
});

["mousemove", "touchmove"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, onMouseODedoMovido);
});
["mouseup", "touchend"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, onMouseODedoLevantado);
});