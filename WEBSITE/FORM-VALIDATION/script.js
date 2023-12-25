
// Variables para almacenar errores de validación
var nameError = document.getElementById('name-error');
var phoneError = document.getElementById('phone-error');
var emailError = document.getElementById('email-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');

// validate name
function validateName() {
    var name = document.getElementById('contact-name').value; // Obtener el valor del campo de nombre
    
    if(name.length == 0) { // Si el nombre está vacío, mostrar un error
        nameError.innerHTML = 'Nombre es requerido';
        return false; // Detener la validación
    }
    // Si el nombre no cumple con el formato de nombre completo, mostrar un error
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = 'Escribe tu nombre completo';
        return false;
    }
    // Si el nombre cumple con los criterios, mostrar un icono de verificación en lugar del error
    nameError.innerHTML = '<i class="fa-solid fa-check-double"></i>';
    return true;
}

// validate phone
function validatePhone() {
    var phone = document.getElementById('contact-phone').value; // Obtener el valor del campo de teléfono

    if(phone.length == 0){ // Si el teléfono está vacío, mostrar un error
        phoneError.innerHTML = 'Teléfono requerido';
        return false;
    }
    if(phone.length !== 10){ // Si el teléfono no tiene 10 dígitos, mostrar un error
        phoneError.innerHTML = 'Teléfono debe ser de 10 dígitos';
        return false;
    }
    if(!phone.match(/^[0-9]{10}$/)) { // Si el teléfono no contiene solo dígitos, mostrar un error
        phoneError.innerHTML = 'Por favor - solo dígitos';
        return false;
    }
    // Si el teléfono cumple con los criterios, mostrar un icono de verificación en lugar del error
    phoneError.innerHTML = '<i class="fa-solid fa-check-double"></i>';
    return true;
}

// validate email
function validateEmail(){
    var email = document.getElementById('contact-email').value; // Obtener el valor del campo de correo electrónico

    if(email.length == 0){ // Si el correo electrónico está vacío, mostrar un error
        emailError.innerHTML = 'Email requerido';
        return false;
    }
    // Si el correo electrónico no cumple con el formato de correo electrónico, mostrar un error
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = 'Email invalido';
        return false;
    }
    // Si el correo electrónico cumple con los criterios, mostrar un icono de verificación en lugar del error
    emailError.innerHTML = '<i class="fa-solid fa-check-double"></i>';
    return true;
}

// validate message
function validateMessage(){
    var message = document.getElementById('contact-message').value; // Obtener el valor del campo de mensaje
    var required = 30; // Número mínimo de caracteres requeridos
    var left = required - message.length; // Caracteres restantes por escribir
    
    if(left > 0) { // Si el mensaje no alcanza la longitud mínima, mostrar un mensaje de advertencia
        messageError.innerHTML = left + ' caracteres restantes';
        return false;
    }
    // Si el mensaje cumple con los criterios, mostrar un icono de verificación en lugar del error
    messageError.innerHTML = '<i class="fa-solid fa-check-double"></i>';
    return true;
}

// validate form
function validateForm(){ // Si alguno de los campos falla la validación, detener el envío
    if( !validateName() || !validatePhone() || !validateEmail() || !validateMessage()) {
        submitError.style.display = 'block';
        submitError.innerHTML = 'Por favor, complete el formulario correctamente';
        setTimeout(function(){submitError.style.display = 'none';}, 3000);
        return false;
    }
}