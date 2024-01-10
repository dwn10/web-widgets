// Esta sección define un arreglo de objetos, donde cada objeto representa una pregunta y sus opciones de respuesta.
// Cada opción tiene un atributo correct que indica si es la respuesta correcta o no.
const questions = [
    {
        question: "Cual es el animal mas largo del mundo?",
        answer: [
            {text: "Tiburón", correct: false},
            {text: "Ballena azul", correct: true},
            {text: "elefante", correct: false},
            {text: "Girafa", correct: false},
        ]
    },

    {
        question: "¿Cuál es el animal más inteligente del mundo?",
        answer: [
            {text: "Orca", correct: true},
            {text: "Elefante africano", correct: false},
            {text: "Humano", correct: false},
            {text: "Pez payaso", correct: false},
        ]
    },

    {
        question: "¿Cuál es el animal más rápido del mundo?",
        answer: [
            {text: "Cheetah", correct: false},
            {text: "Halcón peregrino", correct: false},
            {text: "Águila real", correct: false},
            {text: "Guepardo", correct: true},
        ]
    },

    {
        question: "¿Cuál es el animal más venenoso del mundo?",
        answer: [
            {text: "Tarántula goliath", correct: false},
            {text: "Serpiente de caja marrón", correct: false},
            {text: "Mamba negra", correct: true},
            {text: "Araña viuda negra", correct: false},
        ]
    }
];

// questionElement para mostrar la pregunta, el elemento
const questionElement = document.getElementById("question");
// para mostrar las opciones de respuesta
const answerButtons = document.getElementById("answer-buttons");
// para avanzar al siguiente elemento.
const nextButton = document.getElementById("next-btn");

// Estas variables almacenan el índice de la pregunta actual y el puntaje actual del usuario.
let currentQuestion = 0;
let score = 0;

// Esta función inicia el cuestionario reiniciando el índice de la pregunta actual,
// el puntaje y el texto del botón nextButton. Luego,
// llama a la función showQuestion() para mostrar la primera pregunta.
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Esta función muestra la pregunta actual y sus opciones de respuesta.
// También establece el texto del elemento questionElement con el número de la pregunta
// y la pregunta en sí. Luego, recorre las opciones de respuesta
// y crea botones para cada una de ellas. Por último, añade los botones al elemento
// answerButtons y les asigna un manejador de eventos click para la función selectAnswer().
function showQuestion(){

    // limpiar el contenido de la interfaz de usuario y prepararla para mostrar la siguiente pregunta.
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; // Asigna el número de la pregunta
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Concatena el número de la pregunta

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button"); // Crea un botón HTML usando
        button.innerHTML = answer.text; //  Asigna el texto de la opción al botón utilizando
        button.classList.add("btn"); // Agrega la clase CSS btn al botón para style
        answerButtons.appendChild(button); // Agrega el botón al contenedor

        if(answer.correct){
            button.dataset.correct = answer.correct; // Si la opción es la respuesta correcta, asigna el valor
        }

        button.addEventListener("click", selectAnswer); // Agrega el evento de clic al botón
    });
}

// Esta función limpia el contenido de la interfaz de usuario para preparar la siguiente pregunta
function resetState(){
    nextButton.style.display = "none"; // Oculta el botón "Siguiente"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild); // Recorre todos los botones de respuesta y los elimina del contenedor
    }
}

// Esta función maneja la selección de una respuesta de opción múltiple en la interfaz de usuario.
function selectAnswer(e){
    const selectedBtn = e.target; // Obtiene el botón seleccionado
    const isCorrect = selectedBtn.dataset.correct === "true"; // Determina si la respuesta seleccionada es correcta comparando el valor

    if(isCorrect){
        selectedBtn.classList.add("correct"); // Agrega la clase CSS correct al botón para resaltarla.
        score ++; // mantiene el recuento de respuestas correctas.
    }else{
        selectedBtn.classList.add("incorrect"); // indicar que la respuesta es incorrecta.
    }

    // Marca todas las opciones de respuesta correctas
    Array.from(answerButtons.children).forEach(button => {

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; // Desactiva todos los botones de respuesta
    });

    nextButton.style.display = "block"; // Muestra el botón "Siguiente"
}

// Esta función muestra el puntaje final del cuestionario
// en la interfaz de usuario y permite reiniciar el cuestionario.
function showScore(){
    resetState();
    questionElement.innerHTML = `Tu puntuación es ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Prueba de nuevo...";
    nextButton.style.display = "block";
}

// Esta función se encarga de avanzar al siguiente elemento del cuestionario
function handleNextButton(){
    currentQuestionIndex++; // indica la siguiente pregunta a mostrar

    if(currentQuestionIndex < questions.length){ // Verificación de si quedan preguntas
        showQuestion();
    }else{
        showScore(); // muestra el resumen de la puntuación
    }
}

// Este evento se activa cuando el usuario hace clic en el botón "Siguiente"
nextButton.addEventListener("click", ()=>{

    if(currentQuestionIndex < questions.length){
        handleNextButton(); // para verificar si existen más preguntas
    }else{
        startQuiz(); //  inicia nuevamente el cuestionario
    }
});

// Esta función llama al principio del programa
// y se encarga de configurar el estado inicial del cuestionario.
startQuiz();
