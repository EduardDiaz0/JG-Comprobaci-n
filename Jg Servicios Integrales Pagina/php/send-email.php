<?php
/**
 * send-email.php — JG Servicios Integrales
 * Ubicación: php/send-email.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// ── CONFIGURACIÓN ──────────────────────────────────────────
$destinatario  = 'contacto@jgserviciosintegrales.mx'; // ← correo donde llegan los mensajes
$copia_oculta  = 'admon@serviciosintegrales.mx';       // ← copia al administrador
$asunto_prefix = '[JG Servicios Web]';
// ───────────────────────────────────────────────────────────

// Leer y sanear datos
function limpiar($valor) {
    return htmlspecialchars(strip_tags(trim($valor ?? '')));
}

$nombre   = limpiar($_POST['nombre']   ?? '');
$email    = limpiar($_POST['email']    ?? '');
$telefono = limpiar($_POST['telefono'] ?? '');
$empresa  = limpiar($_POST['empresa']  ?? '');
$asunto   = limpiar($_POST['asunto']   ?? '');
$mensaje  = limpiar($_POST['mensaje']  ?? '');

// Mapear valores del select a etiquetas legibles
$asuntos_map = [
    'cotizacion' => 'Solicitud de cotización',
    'general'    => 'Información general',
    'quejas'     => 'Quejas y sugerencias',
    'facturacion'=> 'Facturación',
    'pedidos'    => 'Información de pedidos',
    'soporte'    => 'Soporte técnico',
    'otro'       => 'Otro',
];
$asunto_label = $asuntos_map[$asunto] ?? 'Sin especificar';

// Validaciones básicas
$errores = [];
if (empty($nombre))                         $errores[] = 'Nombre requerido';
if (empty($email) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
                                            $errores[] = 'Correo inválido';
if (empty($asunto))                         $errores[] = 'Asunto requerido';
if (empty($mensaje))                        $errores[] = 'Mensaje requerido';

if (!empty($errores)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errores)]);
    exit;
}

// Construir el correo
$asunto_email = "{$asunto_prefix} {$asunto_label} — {$nombre}";

$cuerpo = "
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NUEVO MENSAJE DESDE EL SITIO WEB
  JG Servicios Integrales de Chiapas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATOS DEL CONTACTO
──────────────────
Nombre:    {$nombre}
Correo:    {$email}
Teléfono:  " . ($telefono ?: 'No proporcionado') . "
Empresa:   " . ($empresa  ?: 'No proporcionada') . "
Asunto:    {$asunto_label}

MENSAJE
───────
{$mensaje}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Enviado desde: jgserviciosintegrales.mx
Fecha: " . date('d/m/Y H:i:s') . "
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
";

$headers  = "From: no-reply@jgserviciosintegrales.mx\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Bcc: {$copia_oculta}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Guardar en log de respaldo (por si el mail falla)
$log_dir  = __DIR__ . '/../logs';
$log_file = $log_dir . '/contactos.txt';

if (!is_dir($log_dir)) {
    mkdir($log_dir, 0755, true);
}

$log_entry = "[" . date('d/m/Y H:i:s') . "] {$nombre} | {$email} | {$asunto_label}\n";
file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);

// Enviar correo
$enviado = mail($destinatario, $asunto_email, $cuerpo, $headers);

if ($enviado) {
    // Correo de confirmación al remitente
    $asunto_confirmacion = "Recibimos tu mensaje — JG Servicios Integrales";
    $cuerpo_confirmacion = "
Hola {$nombre},

Gracias por contactarnos. Recibimos tu mensaje correctamente.

RESUMEN DE TU CONSULTA
──────────────────────
Asunto:  {$asunto_label}
Mensaje: {$mensaje}

Nuestro equipo te responderá a la brevedad posible a este correo ({$email}).

Si tienes urgencia, puedes llamarnos directamente:
  📞 961 454 00 29
  💬 WhatsApp: https://wa.me/529614540029

Atentamente,
JG Servicios Integrales de Chiapas
Av. Rosa del Oriente No. 178, Tuxtla Gutiérrez, Chiapas
";
    $headers_conf  = "From: contacto@jgserviciosintegrales.mx\r\n";
    $headers_conf .= "X-Mailer: PHP/" . phpversion();
    mail($email, $asunto_confirmacion, $cuerpo_confirmacion, $headers_conf);

    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al enviar. Por favor llámanos directamente al 961 454 00 29']);
}   