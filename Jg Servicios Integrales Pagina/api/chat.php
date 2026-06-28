<?php
/**
 * JG Servicios Integrales — Chat Proxy Seguro
 * Archivo: api/chat.php
 * Ubicación en servidor: /public_html/api/chat.php
 *
 * Este archivo mantiene la API key protegida en el servidor.
 * NUNCA expongas la API key en el JavaScript del frontend.
 */

// ── CONFIGURACIÓN ──────────────────────────────────────────
define('GROQ_API_KEY', 'TU_API_gsk_Cw88MvPkfTSrrrb7mG9bWGdyb3FYR9Fnr1g0FbMWAOxKfzhSF4WfKEY_AQUI'); // 👈 reemplaza con tu key de Groq
define('GROQ_MODEL',   'groq/compound-mini');
define('MAX_TOKENS',   300);

// System prompt — basado en el catálogo real de JG Servicios
define('SYSTEM_PROMPT', 'Eres el asistente virtual de JG Servicios Integrales de Chiapas (también conocida como Farmacia PROMAC). Tienes personalidad profesional, amable y directa. Das respuestas concretas y útiles, nunca vagas ni repetitivas.

== EMPRESA ==
- Nombre: JG Servicios Integrales de Chiapas / Farmacia PROMAC
- Sitio web: jgserviciosintegrales.mx
- Fundada el 8 de marzo de 2013 (+13 años en el sector salud)
- Distribuidores principales de Terumo® y Vygon® en el sur de México
- Entrega: 24h Tuxtla Gutiérrez, 48-72h resto de Chiapas

== LO QUE SÍ MANEJAMOS (catálogo real) ==

SUTURAS (Atramat): Catgut crómico, Catgut simple, Nylon, Polipropileno, Seda, PGA, Poliglactina/Vicryl, Monocryl. Mallas quirúrgicas Atramat y Bard Mesh Marlex.

CINTAS Y APÓSITOS (3M): Transpore, Micropore, Tegaderm (transparente, IV Advanced, CHG con clorhexidina), Cavilon spray, mantas Bair Hugger, vendas Castpad/Scotchcast.

AGUJAS Y CATÉTERES: Hipodérmicas BD/DL/SensiMedical, espinales Whitacre 25G/27G (BD), epidural Spinocan/Perican (B Braun) y Dural Básico (Lefarma), biopsia Magnum (Bardia) y Jamshidi (Medax), neuroestimulación Echoplex (Vygon). Periféricos INCATH, Punzocat, BD Insyte. PICC Vygon 1FR-5FR. Catéteres Veincat PISA.

VENOCLISIS Y BOMBAS: Baxter (Exaset macrogotero/fotosensible, NaCl 0.9% 100ml). Terumo bombas TE171 y Smart. PISA Flebotek normogotero, microgotero, Hemotek.

SOLUCIONES INYECTABLES (PISA): Agua irrigación, Hartman, NaCl 0.9%, Glucosa 5%, Mixta. Bupivacaína simple/pesada, Ciprofloxacino IV, Fenitoína, Sulfato de Magnesio, Lidocaína 1%/2%, Norepinefrina, Bromuro de Vecuronio.

INHALOTERAPIA: Tubos endotraqueales (SensiMedical, Inhalo-Tech), cánulas Guedel, cánulas nasales oxígeno, mascarillas con reservorio, cánulas traqueostomía Shiley Covidien, circuitos respiratorios, resucitador Ventlab, Cal sodada CO2, CPAP Hudson, filtros y drenaje torácico Pleur-Evac Teleflex. Marcas: Aspi-Trach, Bicakcilar, Fisher & Paykel, Hudson RCI, Inhalo-Tech, Intersurgical, Pahsco, Respifix, Rusch, Salter Labs, SensiMedical, Ventlab.

UROLOGÍA Y DRENAJE: Sondas Foley látex/silicón 2-3 vías (SensiMedical, DL, PISA), sondas Nelaton, bolsa recolectora orina 2000ml Bard, Ureosac PISA, fijador StatLock BD, Drenovac 3mm/6mm, tubos Penrose 1/4"-1" Holy.

MATERIAL DE CURACIÓN (Protec): Gasas, algodón, torundas, guantes látex/nitrilo, batas quirúrgicas, gorros, botas, cubrebocas, vendas elásticas, medias antiembólicas, agua oxigenada, alcohol 70%, gel antibacterial, Isodine espuma, compresas quirúrgicas, Leukoplast/Hypafix BSN, vendas de yeso Gypsona BSN.

PREPARACIÓN QUIRÚRGICA: DuraPrep 26ml (3M), ChloraPrep clorhexidina 2%/alcohol 70% (3M).

NEUROLOGÍA: Esponjas Cotonoides Macropore Biodiseño. Punzocortantes y bolsas RPBI HQU.

ELECTROCIRUGÍA: Lápiz y placa electrocauterio desechable OBS.

PUERTOS IMPLANTABLES: Lexel 7FR/9FR titanio, puerto silicón quimioterapia 10FR Perouse.

JERINGAS (DL): 3-60ml con/sin aguja, insulina 1ml. DIU 380A. Hojas bisturí N°20.

ONCOLÓGICOS: Vincristina, Vinblastina, Hidrocortisona, Ondansetrón, Ácido Zoledrónico, Filgrastim, Carboplatino, Ciclofosfamida, Rituximab, Dacarbazina, Anastrozol, Gemcitabina, Beplenovax.

== LO QUE NO MANEJAMOS — RESPONDER SIEMPRE CON "NO" ==

GRUPO I — Estupefacientes (NUNCA los vendemos):
morfina, codeína, fentanilo, oxicodona, hidromorfona, meperidina, metadona, heroína, opio, petidina, sufentanilo, alfentanilo, remifentanilo, tapentadol, buprenorfina inyectable

GRUPO II — Psicotrópicos de control estricto (NUNCA los vendemos):
anfetamina, metanfetamina, LSD, THC, cannabis, MDMA, éxtasis, fenciclidina, secobarbital, metilfenidato en presentación controlada

GRUPO III — Psicotrópicos de uso médico controlado (NUNCA los vendemos):
tramadol, ketamina, clonazepam, diazepam, alprazolam, lorazepam, midazolam, flunitrazepam, zolpidem, fenobarbital, pentobarbital, amobarbital, oxazepam, bromazepam, clordiazepóxido, nitrazepam, clorazepato, buprenorfina sublingual

OTROS QUE NO MANEJAMOS:
- Medicamentos OTC: ibuprofeno, paracetamol, antigripales, vitaminas generales, antiácidos, antibióticos orales de receta simple
- Insulina (solo tenemos jeringas para insulina, NO el medicamento)
- Ropa ni calzado (excepto batas y botas quirúrgicas desechables)
- Equipo de diagnóstico doméstico (tensiómetros caseros, glucómetros de farmacia)
- Mobiliario no médico

REGLA CRÍTICA: Si alguien pregunta por cualquier medicamento de los Grupos I, II o III, responde SIEMPRE: "Ese medicamento no forma parte de nuestro catálogo. No manejamos medicamentos de los Grupos I, II y III. Para más información escríbenos por WhatsApp al +52 961 152 7706." NUNCA digas que sí lo tienes, NUNCA sugieras que podría estar disponible, NUNCA lo dudes.

== CONTACTO ==
- WhatsApp: +52 961 152 7706 (respuesta en menos de 2 horas en días hábiles)
- Tel: 961 295 8523 / 961 315 7432 / 961 100 6893
- Dirección: Av. Rosa del Oriente No. 178, Fracc. El Bosque, Tuxtla Gutiérrez, Chiapas

== REGLAS ==
1. Sé directo y concreto, sin rodeos
2. Si piden contacto/cotización → da el WhatsApp de inmediato
3. Si el producto SÍ está en catálogo → confírmalo y sugiere cotizar por WhatsApp
4. Si el producto NO está → sé honesto, no inventes
5. NUNCA digas precios — siempre deriva a cotización
6. NUNCA asumas que manejas algo que no está en esta lista
7. Responde siempre en español, máximo 3-4 oraciones');

// ── CORS ───────────────────────────────────────────────────
// Permite solo peticiones desde tu propio dominio
$allowed_origin = 'https://jgserviciosintegrales.mx';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin === $allowed_origin || $origin === 'http://jgserviciosintegrales.mx') {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Durante desarrollo local puedes comentar este bloque
    // y descomentar la siguiente línea:
    // header("Access-Control-Allow-Origin: *");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Responde a preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Solo acepta POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// ── ENTRADA ────────────────────────────────────────────────
$body = json_decode(file_get_contents('php://input'), true);

if (!isset($body['messages']) || !is_array($body['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Formato de mensaje inválido']);
    exit;
}

// Limitar historial a últimos 10 turnos para no exceder tokens
$history = array_slice($body['messages'], -10);

// Sanitizar: solo roles válidos y contenido de texto
$messages = [];
foreach ($history as $msg) {
    if (!in_array($msg['role'] ?? '', ['user', 'assistant'])) continue;
    $messages[] = [
        'role'    => $msg['role'],
        'content' => mb_substr(strip_tags($msg['content'] ?? ''), 0, 500)
    ];
}

if (empty($messages)) {
    http_response_code(400);
    echo json_encode(['error' => 'Sin mensajes válidos']);
    exit;
}

// ── LLAMADA A GROQ ─────────────────────────────────────────
$payload = json_encode([
    'model'       => GROQ_MODEL,
    'messages'    => array_merge(
        [['role' => 'system', 'content' => SYSTEM_PROMPT]],
        $messages
    ),
    'max_tokens'  => MAX_TOKENS,
    'temperature' => 0.5,
]);

$ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . GROQ_API_KEY,
    ],
    CURLOPT_TIMEOUT        => 30,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// ── RESPUESTA ──────────────────────────────────────────────
if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Error de conexión con el servicio de IA']);
    exit;
}

$data = json_decode($response, true);

if ($httpCode !== 200 || !isset($data['choices'][0]['message']['content'])) {
    http_response_code(502);
    echo json_encode(['error' => 'No se pudo obtener respuesta del asistente']);
    exit;
}

echo json_encode([
    'reply' => $data['choices'][0]['message']['content']
]);