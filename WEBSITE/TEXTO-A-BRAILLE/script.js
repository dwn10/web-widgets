function convertir() {
  let entrada = document.querySelector("input[name='entrada']").value;
  let salida = "";

  // Si la entrada es un número
  if (/[0-9]/.test(entrada)) {
    for (let i = 0; i < entrada.length; i++) {
      salida += convertirNumero(entrada[i]);
    }
  } else {
    salida += convertirTexto(entrada);
  }

  // Mostramos la salida
  document.querySelector(".salida").innerHTML = salida;
}

function convertirNumero(numero) {
  let braille = {
    "0": "..",
    "1": "..-",
    "2": ".-.",
    "3": ".-..",
    "4": "-..",
    "5": "-.-.",
    "6": "-.--",
    "7": "--..",
    "8": "--.-",
    "9": "---.",
  };

  return braille[numero];
}

function convertirTexto(texto) {
  let braille = {
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
  };

  let salida = "";
  for (let i = 0; i < texto.length; i++) {
    salida += braille[texto[i]];
  }

  return salida;
}

document.querySelector("input[name='entrada']").addEventListener("keyup", function() {
  if (this.value) {
    document.querySelector(".salida").innerHTML = "";
  }
});

document.querySelector("form").addEventListener("submit", function() {
  convertir();
});