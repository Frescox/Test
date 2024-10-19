const btnNoteElements = document.getElementsByClassName('Note0');

for (let i = 0; i < btnNoteElements.length; i++) {
    btnNoteElements[i].addEventListener('click', function() {
        console.log('Este div funciona');
    });
}


const textInput = document.getElementById('textInput');

// Cambiar el tamaño y ocultar otros elementos al hacer clic
textInput.addEventListener('click', function() {
    textInput.classList.toggle('active'); // Alterna la clase 'active'

    $('#header').fadeToggle(); // Oculta el footer
    $('#footer').fadeToggle(); // Oculta el footer
});


let currentElement = -1; // No hay elementos al principio
const elements = [];
const container = document.getElementById('containerNotes');
const label = document.getElementById('label');

// Función para crear un nuevo elemento con un textarea dentro
function createNewElement() {
    const newElement = document.createElement('div');
    newElement.classList.add('note'); // Añadir clase de la nota
    newElement.id = note

    // Crear el textarea dentro del nuevo div
    const textArea = document.createElement('textarea');
    textArea.placeholder = `Escribe algo en el Elemento ${elements.length + 1}`;
    textArea.id = `textInput`
    
    newElement.appendChild(textArea); // Añadir el textarea al div
    container.appendChild(newElement); // Añadir el div al contenedor
    elements.push(newElement);

    // Si es el primer elemento, mostrarlo inmediatamente
    if (elements.length === 1) {
        currentElement = 0;
        newElement.classList.add('active'); // Lo hacemos activo sin transición
        label.classList.add('hidden');
    }else{
    // Si no está en el último elemento
    if (currentElement < elements.length - 1) {
        // Recorremos hasta el último elemento
        for (let i = currentElement; i < elements.length; i++) {
            showNextElement();
        }
    }
}
}

// Función para mostrar el siguiente elemento con transición
function showNextElement() {
    if (elements.length > 1 && currentElement < elements.length - 1) {
        // Ocultar el actual hacia la izquierda
        elements[currentElement].classList.add('hidden-left');
        elements[currentElement].classList.remove('active');

        // Actualizar el índice del siguiente elemento
        currentElement = (currentElement + 1) % elements.length;

        // Mover el siguiente elemento al centro
        elements[currentElement].classList.remove('hidden-right', 'hidden-left');
        elements[currentElement].classList.add('active');
    }
}

// Función para mostrar el elemento anterior con transición
function showPrevElement() {
    if ((elements.length > 1 && currentElement != 0 )) {
        // Ocultar el actual hacia la derecha
        elements[currentElement].classList.add('hidden-right');
        elements[currentElement].classList.remove('active');

        // Actualizar el índice del elemento anterior
        currentElement = (currentElement - 1 + elements.length) % elements.length;

        // Mover el elemento anterior al centro
        elements[currentElement].classList.remove('hidden-right', 'hidden-left');
        elements[currentElement].classList.add('active');
    }
}

// Listeners para los botones
document.getElementById('newNote').addEventListener('click', createNewElement);
document.getElementById('nextNote').addEventListener('click', showNextElement);
document.getElementById('previosuNote').addEventListener('click', showPrevElement);
