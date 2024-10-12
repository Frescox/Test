document.getElementById("BtnGoBack2").onclick = function() {
    saveText();
    setTimeout(function() {
        window.location.href = "index.html"; 
    }, 500);
};

$(document).ready(function() {
    // Configuración del teclado virtual
    $("#keyboard").keyboard({
        layout: 'qwerty',
        customLayout: {
            'normal': [
                'Q W E R T Y U I O P',
                'A S D F G H J K L Ñ',
                'Z X C V B N M ?123',
                'SPACE SPACE SPACE'
            ]
        },
        usePreview: false
    });

    // Carga el contenido guardado al cargar la página
    loadText();

    // Crea una nueva nota
    $('#BtnNewNote').on('click', function() {
        newNote();
    });
});

const $textInput = $('#textInput'); // Selecciona el textarea usando jQuery

function saveText() {
    const noteContent = $textInput.val(); // Obtiene el valor del textarea
    localStorage.setItem('noteContent', noteContent); // Guarda el contenido en localStorage
    console.log("Texto guardado en localStorage.");
}

function loadText() {
    const savedNote = localStorage.getItem('noteContent');
    if (savedNote) {
        $textInput.val(savedNote); // Carga el contenido guardado en el textarea
        console.log("Texto cargado desde localStorage.");
    } else {
        $textInput.val('Esta tiene valor'); // Carga el valor predeterminado si no hay nada guardado
        console.log("No se encontró texto en localStorage. Usando valor predeterminado.");
    }
}

// Llama a loadText() cuando se carga la página para verificar si hay un valor guardado
$(document).ready(loadText);