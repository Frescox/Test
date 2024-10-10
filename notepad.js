$(function() {
    // Inicialización del teclado virtual
    $("#keyboard").keyboard({
        // Opciones del teclado
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
});


