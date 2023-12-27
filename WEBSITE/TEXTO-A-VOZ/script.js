
// crea un simple prototipo para sintetizar texto en voz alta utilizando el API SpeechSynthesis del navegador
let speech = new SpeechSynthesisUtterance();

// Obtención y almacenamiento de voces disponibles
let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

// Manejo del cambio de voz
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Activación de la síntesis de voz
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
})