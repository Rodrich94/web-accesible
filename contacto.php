<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['guest_email'] ?? '';
    $nombre = $_POST['guest_nombre'] ?? '';
    echo "Recibido. Usuario: " . htmlspecialchars($nombre) . " derivado a cola de IA Comercial.";
} else {
    echo "Método no permitido";
}
?>