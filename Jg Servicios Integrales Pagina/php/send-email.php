<?php
/* ============================================
   SEND-EMAIL.PHP - PROCESADOR DE FORMULARIO
============================================ */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// ============================================
// CONFIGURACIÓN
// ============================================
$config = [
    'email_destino'  => 'contacto@jgserviciosintegrales.mx',
    'email_copia'    => 'ventas@jgserviciosintegrales.mx',
    'nombre_empresa' => 'JG Servicios Integrales de Chiapas',
    'log_file'       => '../logs/contactos.txt',
];

// ============================================
// SANITIZAR Y VALIDAR DATOS
// ============================================
function limpiar($dato) {
    return htmlspecialchars(strip_tags(trim($dato)));
}

$nombre   = limpiar($_POST['nombre']   ?? '');
$email    = limpiar($_POST['email']    ?? '');
$telefono = limpiar($_POST['telefono'] ?? '');
$empresa  = limpiar($_POST['empresa']  ?? '');
$asunto   = limpiar($_POST['asunto']   ?? 'Contacto desde el sitio web');
$mensaje  = limpiar($_POST['mensaje']  ?? '');

// Validaciones básicas
if (empty($nombre) || empty($email) || empty($mensaje)) {
    echo json_encode(['success' => false, 'message' => 'Campos requeridos vacíos']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

// ============================================
// CONSTRUIR EL CORREO
// ============================================
$asunto_email = "[JG Servicios] Nuevo contacto: $asunto";

$cuerpo = "
========================================
NUEVO MENSAJE DESDE EL SITIO WEB
========================================

Nombre:    $nombre
Email:     $email
Teléfono:  $telefono
Empresa:   $empresa
Asunto:    $asunto

Mensaje:
$mensaje

========================================
Enviado el: " . date('d/m/Y H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'] . "
========================================
";

$headers  = "From: noreply@jgserviciosintegrales.mx\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Cc: {$config['email_copia']}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ============================================
// ENVIAR CORREO
// ============================================
$enviado = mail($config['email_destino'], $asunto_email, $cuerpo, $headers);

// ============================================
// GUARDAR EN LOG
// ============================================
$log_entrada = date('Y-m-d H:i:s') . " | $nombre | $email | $telefono | $asunto\n";
file_put_contents($config['log_file'], $log_entrada, FILE_APPEND | LOCK_EX);

// ============================================
// RESPUESTA
// ============================================
if ($enviado) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al enviar el correo']);
}
?>