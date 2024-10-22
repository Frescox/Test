let currentElement = -1; // No hay elementos al principio
const elements = [];
const container = document.getElementById('containerNotes');
const label = document.getElementById('label');
let numberNote = document.getElementById('numberNote')
const left = document.getElementById('previousNote');
const right = document.getElementById('nextNote');

// Función para crear un nuevo elemento con un textarea dentro
function createNewElement(content = '') {
    const newElement = document.createElement('div');
    newElement.classList.add('note'); // Añadir clase de la nota

    // Crear el textarea dentro del nuevo div
    const textArea = document.createElement('textarea');
    textArea.placeholder = `Escribe algo en el Elemento ${elements.length + 1}`;
    textArea.id = `textInput${elements.length + 1}`;
    textArea.className = 'textInput';

    // Asignar contenido previo si hay
    textArea.value = content;

    textArea.addEventListener('input', () => {
        saveNotes(); // Llama a la función sin pasar 'event'
    });
    

    newElement.appendChild(textArea); // Añadir el textarea al div
    container.appendChild(newElement); // Añadir el div al contenedor
    elements.push(newElement);

    // Si es el primer elemento, mostrarlo inmediatamente
    if (elements.length === 1) {
        currentElement = 0;
        numberNote.innerHTML = "Nota " + (currentElement + 1);
        newElement.classList.add('active'); // Lo hacemos activo sin transición
        label.classList.add('hidden');
        left.style.display = 'none';
        right.style.display = 'none';
    } else {
        // Si no está en el último elemento
        if (currentElement < elements.length - 1) {
            // Recorremos hasta el último elemento
            for (let i = currentElement; i < elements.length; i++) {
                showNextElement();
            }
            right.style.display = 'none';
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

        numberNote.innerHTML = "Nota " + (currentElement + 1);
        left.style.display = 'block'
        saveNotes();

    }
    if (currentElement == elements.length -1){
        right.style.display = 'none'
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

        numberNote.innerHTML = "Nota " + (currentElement + 1);
        right.style.display = 'block'
        saveNotes();

    }
    if (currentElement == 0){
        left.style.display = 'none'
    }
}

function saveNotes() {
    const notes = [];
    const allTextAreas = document.querySelectorAll('textarea');

    allTextAreas.forEach(textArea => {
        notes.push(textArea.value); // Agrega el valor del textarea al array
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // Guarda el array en localStorage
    localStorage.setItem('notesTimestamp', Date.now()); // Guarda la fecha actual
}

// Cargar notas del localStorage al iniciar
function loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    storedNotes.forEach(note => {
        createNewElement(note); // Crea cada nota desde el localStorage
    });
}

// Verificar si las notas deben eliminarse
function checkNotesExpiration() {
    const timestamp = localStorage.getItem('notesTimestamp');
    const oneDayInMillis = 6 * 60 * 60 * 1000; // Un día en milisegundos

    if (timestamp && (Date.now() - timestamp > oneDayInMillis)) {
        localStorage.removeItem('notes'); // Elimina las notas del localStorage
        localStorage.removeItem('notesTimestamp'); // Elimina la fecha
    }
}

// Al cargar la página, verifica si las notas han expirado
checkNotesExpiration();

// Llamar a la función para cargar las notas al iniciar
loadNotes();

function goBack1(){
    saveNotes();
}


// Listeners para los botones
document.getElementById('newNote').addEventListener('click', () => createNewElement(''));
document.getElementById('nextNote').addEventListener('click', showNextElement);
document.getElementById('previousNote').addEventListener('click', showPrevElement);
document.getElementById('BtnGoBack1').addEventListener('click', goBack1);
