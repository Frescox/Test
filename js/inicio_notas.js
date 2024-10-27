let currentElement = 0; // No hay elementos al principio
const elements = [];
const container = document.getElementById('containerNotes');
const label = document.getElementById('label');
let numberNote = document.getElementById('numberNote');
const left = document.getElementById('previousNote');
const right = document.getElementById('nextNote');


// Función para crear un nuevo elemento con un textTarea dentro
function createNewElement(content = '') {
    const newElement = document.createElement('div');
    newElement.classList.add('note'); // Añadir clase de la nota

    // Crear el textTarea dentro del nuevo div
    const textTarea = document.createElement('textarea');
    textTarea.placeholder = `Escribe algo en la nota ${elements.length + 1}`;
    textTarea.id = `textInput${elements.length + 1}`;
    textTarea.className = 'textInput';

    // Asignar contenido previo si hay
    textTarea.value = content;

    textTarea.addEventListener('input', () => {
        saveNotes();
    });

    newElement.appendChild(textTarea); // Añadir el textTarea al div
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
        left.style.display = 'block';
    }
    if (currentElement == elements.length - 1) {
        right.style.display = 'none';
    }
}

// Función para mostrar el elemento anterior con transición
function showPrevElement() {
    if ((elements.length > 1 && currentElement != 0)) {
        // Ocultar el actual hacia la derecha
        elements[currentElement].classList.add('hidden-right');
        elements[currentElement].classList.remove('active');

        // Actualizar el índice del elemento anterior
        currentElement = (currentElement - 1 + elements.length) % elements.length;

        // Mover el elemento anterior al centro
        elements[currentElement].classList.remove('hidden-right', 'hidden-left');
        elements[currentElement].classList.add('active');

        numberNote.innerHTML = "Nota " + (currentElement + 1);
        right.style.display = 'block';
    }
    if (currentElement == 0) {
        left.style.display = 'none';
    }
}

function saveNotes() {
    const notes = [];
    const allTextTareas = document.querySelectorAll('textarea');

    allTextTareas.forEach(textTarea => {
            notes.push(textTarea.value); // Agrega el valor del textarea al array
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // Guarda el array en localStorage
    localStorage.setItem('notesTimestamp', Date.now()); // Guarda la fecha actual
    localStorage.setItem('currentElement', currentElement); // Guarda el índice actual
}


// Función para cargar las notas al iniciar
function loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    container.innerHTML = ''; // Limpiar el contenedor antes de agregar notas de localStorage
    elements.length = 0; // Limpiar el array elements para evitar conflictos

    if (storedNotes.length > 0) {
        storedNotes.forEach((note) => {
            createNewElement(note); // Crea cada nota desde localStorage
        });

        currentElement = parseInt(localStorage.getItem('currentElement')) || 0;
        let cont = 0; // Cambiado a let para permitir incremento

        // Asegurar que currentElement esté dentro del rango de notas
        if (currentElement >= 0 && currentElement < elements.length) {
            // Desactivar todas las notas primero
            elements.forEach((element) => {
                element.classList.remove('active', 'hidden-left', 'hidden-right'); // Limpiar clases previas

                // Posicionar las notas en relación a currentElement
                if (cont < currentElement) {
                    element.classList.add('hidden-left');
                } else if (cont > currentElement) {
                    element.classList.add('hidden-right');
                }

                cont += 1;
            });

            // Activar solo la nota actual almacenada en currentElement
            elements[currentElement].classList.add('active');

            // Actualizar el número de nota
            numberNote.innerHTML = "Nota " + (currentElement + 1);

            // Configurar visibilidad de botones
            left.style.display = currentElement > 0 ? 'block' : 'none';
            right.style.display = currentElement < elements.length - 1 ? 'block' : 'none';
        } else {
            // En caso de que currentElement esté fuera de rango, mostrar mensaje de error
            currentElement = 0;
            numberNote.innerHTML = "No hay notas disponibles";
            left.style.display = 'none';
            right.style.display = 'none';
        }
    } else {
        // Si no hay notas guardadas, mostrar mensaje de que no hay notas disponibles
        numberNote.innerHTML = "No hay notas disponibles";
        left.style.display = 'none';
        right.style.display = 'none';
    }
}

// Llamar a la función para cargar las notas al iniciar
loadNotes();

function goBack1() {
    saveNotes();
}

function saveNotes_DB() {
    const notes = [];
    const alltextTareas = document.querySelectorAll('textTarea');

    alltextTareas.forEach(textTarea => {
        notes.push(textTarea.value); // Agrega el contenido del textTarea al array
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // Guarda el array en localStorage

    // Envia las notas a la base de datos
    const currentDate = new Date().toISOString().slice(0, 10);//Obtine la fecha

    fetch('save_note.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_id=1&notes=${encodeURIComponent(JSON.stringify(notes))}&date=${currentDate}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error al guardar las notas: ', error);
    });

}

// Listeners para los botones
document.getElementById('newNote').addEventListener('click', () => createNewElement(''));
document.getElementById('nextNote').addEventListener('click', showNextElement);
document.getElementById('previousNote').addEventListener('click', showPrevElement);
document.getElementById('BtnGoBack1').addEventListener('click', goBack1);
