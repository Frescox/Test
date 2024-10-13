
// Importar la clase NoteManager
import { NoteManager } from "./notepad.js";

// Crear una instancia de NoteManager
let noteManager = new NoteManager();

try {
    let iframe = document.getElementById('notePreview');
    iframe.onload = function() {
        let iframeDocument = iframe.contentWindow.document;
        let elementsToHide = iframeDocument.querySelectorAll('#footerNote');
        elementsToHide.forEach(el => el.style.display = 'none');
    };
} catch (error) {
    console.error('Error accediendo al iframe:', error);
}

$(document).ready(function() {
    // Crear una instancia de NoteManager
    const noteManager = new NoteManager(); // Asegúrate de tener definida esta instancia

<<<<<<< HEAD
    // Configurar los eventos de botones

    // Botón para acceder a la siguiente nota
    /*document.getElementById('nextNote').onclick = function() {
        noteManager.goToNextNote(); // Cambiar a la siguiente nota
    };

    // Botón para acceder a la nota anterior
    document.getElementById('previosuNote').onclick = function() {
        noteManager.goToPreviousNote(); // Cambiar a la nota anterior
    };*/

    document.getElementById('upDateNote').onclick = function() {
        setTimeout(function() {
            window.location.href = "notePad.html"; // Redirige a la página notePad.html
        }, 500);
        loadNoteContent(3);
        console.log('Contenido de la nota actualizado.');
    };

    // Botón para eliminar notas (aquí eliminamos solo la nota actual)
    document.getElementById('removeBtn').onclick = function() {
        console.log('Borrando nota actual.');
        noteManager.removeNote(noteManager.currentNoteId); // Eliminar solo la nota actual
        $('#textInput').val(''); // Limpiar el área de texto
        window.location.reload();
    };

    /*document.getElementById('newNote').onclick = function() {
        console.log('Creando nota.');
        noteManager.createNewNote();
    };*/

    // Botón para mostrar el contenido de localStorage (función showLocalStorage)
    document.getElementById('BtnGoBack1').onclick = function() {
        console.log('Mostrando contenido de localStorage.');
        noteManager.showLocalStorage(); // Mostrar el contenido del almacenamiento
    };

    // Cargar el contenido de la nota actual al cargar la página
    noteManager.loadNoteContent(noteManager.currentNoteId); // Cargar el contenido de la nota actual
});
=======
iframe.onload = function() {
    const iframeDocument = iframe.contentWindow.document;
    const elementsToHide = iframeDocument.querySelectorAll('header, footer, .BtnGoBack2');
    elementsToHide.forEach(el => el.style.display = 'none');
};

function loadText() {
    const savedNote = localStorage.getItem('noteContent');
    if (savedNote) {
        textInput.value = savedNote; 
        console.log("Texto cargado desde localStorage.");
    }
}
>>>>>>> a3f48d5b6e86c9af7e37c808b27a0979557d229a
