<?php
// save_note.php
session_start();
// Conectar a la base de datos
$servername = "localhost";
$username = "root"; // Cambia esto a tu usuario de la base de datos
$password = ""; // Cambia esto a tu contraseña de la base de datos
$dbname = "sonrisas_db"; // Cambia esto al nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// verifica que el ID del usuario esté disponible en la sesión
if (!isset($_SESSION['user_id'])) {
    echo "No se ha encontrado el ID de usuario.";
    exit;
}

$user_id = $_SESSION['user_id'];
$notes = json_decode($_POST['notes'], true); // Decodifica el JSON enviado desde JavaScript

if (!empty($user_id) && !empty($notes)) {
    foreach ($notes as $note_content) {
        // Asegúrate de escapar adecuadamente las entradas
        $note_content = mysqli_real_escape_string($conn, $note_content);
        $query = "INSERT INTO users_notes (id_user, content, Fecha) 
                  VALUES ('$user_id', '$note_content', NOW())"; // NOW() para la fecha actual

        if (!mysqli_query($conn, $query)) {
            echo "Error: " . mysqli_error($conn);
        }
    }
    echo "Notas guardadas con éxito.";
} else {
    echo "Faltan datos.";
}

// Cierra la conexión
$conn->close();
?>
