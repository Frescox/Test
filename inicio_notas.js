
document.getElementById("newNoteBtn").onclick = function() {
    loadText()
    setTimeout(function() {
        window.location.href = "notePad.html"; 
    }, 500);
};

const url = "http://127.0.0.1:5500/notePad.html";
if (url) {
    document.getElementById("notePreview").src = url;
}

const iframe = document.getElementById('notePreview');

iframe.onload = function() {
    const iframeDocument = iframe.contentWindow.document;
    const elementsToHide = iframeDocument.querySelectorAll('header, footer, .BtnGoBack');
    elementsToHide.forEach(el => el.style.display = 'none');
};

function loadText() {
    const savedNote = localStorage.getItem('noteContent');
    if (savedNote) {
        textInput.value = savedNote; // Carga el contenido guardado en el textarea
        console.log("Texto cargado desde localStorage.");
    }
}

function removeText() {
    localStorage.removeItem('noteContent'); // Elimina el contenido del localStorage
    textInput.value = ""; // Limpia el textarea
    console.log("Texto eliminado.");
}

function newNote() {
    textInput.value = ""; // Limpia el campo de texto para una nueva nota
    console.log("Nueva nota creada.");
}
