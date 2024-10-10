// Selecciona el botón y el contenedor de la nota
const newNoteBtn = document.getElementById('newNoteBtn');
const noteContainer = document.getElementById('noteContainer');

// Añade un evento de clic al botón
newNoteBtn.addEventListener('click', function() {
    // Alterna la visibilidad de la hoja de cuaderno
    noteContainer.classList.toggle('show');
});

$(document).ready(function() {
    $("#textInput").keyboard({
        layout: 'qwerty',
        customLayout: {
            'normal': [
                'q w e r t y u i o p',
                'a s d f g h j k l',
                'z x c v b n m , .',
                '{space} {bksp}'
            ]
        },
        autoAccept: true,
        alwaysOpen: false,
        autoFocus: true,
        visible: function() {
            // Muestra el teclado cuando el textarea recibe foco
            $(this).keyboard().reveal();
        },
        hidden: function() {
            // Esconde el teclado cuando el textarea pierde foco
            $(this).keyboard().close();
        }
    });
});

