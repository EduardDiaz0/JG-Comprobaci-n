(function () {
  /* =========================================================
     JG Servicios Integrales — Chatbot Widget v1.0
     Incluir en index.html (y cualquier página) antes de </body>
  ========================================================= */

  // Para producción: elimina GROQ_KEY y usa 'api/chat.php'
  const GROQ_KEY = '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';
  const SYSTEM_PROMPT = `Eres el asistente virtual de JG Servicios Integrales de Chiapas / Farmacia PROMAC. Profesional, amable y directo. Respuestas concretas, máximo 3-4 oraciones, siempre en español.

EMPRESA: Distribuidores de Terumo y Vygon en el sur de México. +13 años en el sector salud. Entrega 24h Tuxtla Gutiérrez, 48-72h resto de Chiapas.

CATALOGO:
- Suturas/cirugía: Catgut crómico/simple, Nylon, Polipropileno, Seda, PGA, Vicryl, Monocryl, mallas quirúrgicas Atramat/Bard
- Cintas/apósitos 3M: Transpore, Micropore, Tegaderm, Cavilon, Bair Hugger, Scotchcast
- Agujas/catéteres: hipodérmicas BD/DL, espinales Whitacre 25G/27G, epidural Spinocan/Perican/Dural, biopsia Magnum/Jamshidi, Echoplex Vygon, INCATH/Punzocat/BD Insyte, PICC Vygon 1-5FR, Veincat PISA
- Venoclisis/bombas: Baxter Exaset, Terumo TE171/Smart, PISA Flebotek/Hemotek
- Soluciones PISA: Hartman, NaCl 0.9%, Glucosa 5%, Mixta, Bupivacaína, Lidocaína 1%/2%, Ciprofloxacino IV, Fenitoína, Sulfato de Magnesio, Norepinefrina
- Inhaloterapia: tubos endotraqueales, cánulas Guedel/nasales/traqueostomía Shiley, mascarillas, CPAP Hudson, Pleur-Evac Teleflex, resucitador Ventlab
- Urología/drenaje: sondas Foley látex/silicón, Nelaton, bolsa Bard 2000ml, StatLock BD, Drenovac, Penrose
- Curación/antisépticos: gasas, guantes látex/nitrilo, batas quirúrgicas, vendas, alcohol 70%, Isodine, compresas, Leukoplast/Hypafix, yeso Gypsona
- Preparación quirúrgica: DuraPrep 3M, ChloraPrep clorhexidina 2%
- Especialidad: Cotonoides Macropore, RPBI, electrocauterio OBS, puertos implantables Lexel/Perouse
- Jeringas DL 3-60ml, insulina 1ml; DIU 380A; hojas bisturí N°20
- Oncológicos: Vincristina, Vinblastina, Hidrocortisona, Ciclofosfamida, Rituximab, Carboplatino, Ondansetrón, Ácido Zoledrónico, Filgrastim, Dacarbazina, Anastrozol, Gemcitabina, Beplenovax
- Anestésicos PISA: Bupivacaína, Lidocaína, Norepinefrina, Fenitoína, Ciprofloxacino IV, Sulfato de Magnesio, Vecuronio

NO MANEJAMOS — responde siempre NO:
- Grupo I: morfina, codeína, fentanilo, oxicodona, meperidina, metadona, sufentanilo, remifentanilo, tapentadol, buprenorfina inyectable
- Grupo II: anfetamina, metanfetamina, LSD, THC, cannabis, MDMA, fenciclidina, secobarbital
- Grupo III: tramadol, ketamina, clonazepam, diazepam, alprazolam, lorazepam, midazolam, zolpidem, fenobarbital, buprenorfina sublingual
- OTC: ibuprofeno, paracetamol, antigripales, vitaminas, antiácidos, insulina medicamento
- Si preguntan por Grupo I/II/III responde: "Ese medicamento no está en nuestro catálogo." y agrega [CONTACTO]

TOKENS — usa EXACTAMENTE estos tokens, nunca escribas URLs ni teléfonos directamente:
- [CONTACTO]  → cuando pregunten por teléfono, WhatsApp, horario, dirección o cómo contactarnos
- [CATALOGO]  → cuando pregunten por productos o catálogo
- [SERVICIOS] → cuando pregunten por servicios
- [SUCURSAL]  → cuando pregunten por la sucursal o Farmacia PROMAC
- [NOSOTROS]  → cuando pregunten por la empresa, historia o quiénes somos
- [PROVEEDORES] → cuando pregunten por proveedores o marcas
- [FAQ]       → cuando pregunten por preguntas frecuentes
- [WHATSAPP]  → cuando solo necesiten el botón de WhatsApp rápido

REGLAS CRÍTICAS:
1. NUNCA escribas números de teléfono, URLs, links ni correos directamente
2. Usa SOLO los tokens de arriba para cualquier referencia a páginas o contacto
3. Confirma productos del catálogo y sugiere cotizar con [WHATSAPP]
4. Nunca digas precios
5. Nunca inventes productos;

// ── ESTILOS ──────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Open+Sans:wght@400;600&display=swap');
    :root {
      --jg-blue:#1B3A6B; --jg-blue-l:#24508F;
      --jg-orange:#F5A033; --jg-orange-l:#F7B55A;
      --jg-gray:#9B9B9B; --jg-gray-bg:#F4F5F7; --jg-gray-mid:#E8E9EC;
    }
    #jg-fab {
      position:fixed; bottom:28px; right:28px;
      width:62px; height:62px; border-radius:50%;
      background:var(--jg-blue); border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 20px rgba(27,58,107,.45);
      transition:transform .2s,box-shadow .2s; z-index:9998;
    }
    #jg-fab:hover { transform:scale(1.07); box-shadow:0 6px 28px rgba(27,58,107,.55); }
    #jg-fab-ring {
      position:absolute; inset:-3px; border-radius:50%;
      border:2.5px solid var(--jg-orange);
      animation:jgFabPulse 2.5s ease infinite;
      pointer-events:none;
    }
    @keyframes jgFabPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(1.1)} }
    #jg-fab-badge {
      position:absolute; top:-2px; right:-2px;
      width:20px; height:20px; border-radius:50%;
      background:var(--jg-orange); border:2px solid #fff;
      font-size:10px; font-weight:800; color:#fff;
      font-family:'Montserrat',sans-serif;
      display:flex; align-items:center; justify-content:center;
    }
    #jg-win {
      position:fixed; bottom:104px; right:28px;
      width:350px; border-radius:18px; overflow:hidden;
      box-shadow:0 12px 48px rgba(27,58,107,.2),0 2px 8px rgba(27,58,107,.1);
      display:none; flex-direction:column; z-index:9999;
      max-height:480px; border:.5px solid rgba(27,58,107,.12);
      background:#fff; animation:jgSlideUp .25s ease both;
    }
    @keyframes jgSlideUp { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
    #jg-win.open { display:flex; }

    /* HEADER */
    #jg-header {
      background:var(--jg-blue); padding:0;
      flex-shrink:0; position:relative; overflow:hidden;
    }
    .jg-h-blob1 {
      position:absolute; top:0; right:0;
      width:80px; height:80px; border-radius:50%;
      background:var(--jg-orange); opacity:.1;
      transform:translate(20px,-20px); pointer-events:none;
    }
    .jg-h-blob2 {
      position:absolute; bottom:0; right:40px;
      width:36px; height:36px; border-radius:50%;
      background:var(--jg-orange); opacity:.07;
      transform:translateY(10px); pointer-events:none;
    }
    #jg-header-top {
      padding:12px 14px 10px;
      display:flex; align-items:center; gap:10px;
      position:relative; z-index:1;
    }
    #jg-logo-wrap {
      width:42px; height:42px; border-radius:10px;
      background:#fff; border:2px solid var(--jg-orange);
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; overflow:hidden; padding:3px;
    }
    #jg-logo-wrap img {
      width:100%; height:100%; object-fit:contain;
    }
    #jg-header-info { flex:1; }
    #jg-header-name {
      font-family:'Montserrat',sans-serif;
      font-weight:700; font-size:13.5px;
      color:#fff; display:block; letter-spacing:.2px;
    }
    #jg-header-sub {
      font-size:10px; color:rgba(255,255,255,.6);
      font-family:'Open Sans',sans-serif;
      display:flex; align-items:center; gap:5px; margin-top:2px;
    }
    .jg-dot {
      width:7px; height:7px; border-radius:50%;
      background:#4ade80; animation:jgBlink 2s ease infinite;
    }
    @keyframes jgBlink { 0%,100%{opacity:1} 50%{opacity:.3} }
    #jg-close {
      background:rgba(255,255,255,.1); border:none; cursor:pointer;
      color:rgba(255,255,255,.7); width:30px; height:30px;
      border-radius:8px; display:flex; align-items:center; justify-content:center;
      transition:background .2s,color .2s; flex-shrink:0;
    }
    #jg-close:hover { background:rgba(255,255,255,.2); color:#fff; }
    #jg-header-bar { height:3px; background:linear-gradient(90deg,var(--jg-orange),var(--jg-orange-l),transparent); }

    /* MENSAJES */
    #jg-msgs {
      flex:1; overflow-y:auto;
      padding:14px 14px 10px;
      display:flex; flex-direction:column; gap:10px;
      background:var(--jg-gray-bg);
    }
    #jg-msgs::-webkit-scrollbar { width:4px; }
    #jg-msgs::-webkit-scrollbar-thumb { background:var(--jg-gray-mid); border-radius:4px; }
    .jg-msg { display:flex; flex-direction:column; max-width:86%; }
    .jg-msg.bot { align-self:flex-start; }
    .jg-msg.user { align-self:flex-end; }
    .jg-msg.bot .jg-bubble {
      background:#fff; color:#1a2a3a;
      border:.5px solid var(--jg-gray-mid);
      border-radius:14px 14px 14px 3px;
      padding:10px 13px;
      font-family:'Open Sans',sans-serif; font-size:12.5px; line-height:1.55;
      box-shadow:0 1px 4px rgba(27,58,107,.06);
    }
    .jg-msg.user .jg-bubble {
      background:var(--jg-blue); color:#fff;
      border-radius:14px 14px 3px 14px;
      padding:10px 13px;
      font-family:'Open Sans',sans-serif; font-size:12.5px; line-height:1.55;
    }
    .jg-meta { display:flex; align-items:center; gap:4px; margin-top:3px; }
    .jg-msg.user .jg-meta { justify-content:flex-end; }
    .jg-time { font-size:9.5px; color:var(--jg-gray); font-family:'Open Sans',sans-serif; }
    .jg-check { font-size:10px; color:var(--jg-orange); }

    /* CHIPS */
    #jg-chips {
      padding:8px 12px 6px;
      display:flex; gap:6px; flex-wrap:wrap;
      background:#fff; border-top:.5px solid var(--jg-gray-mid);
      flex-shrink:0;
    }
    .jg-chip {
      font-family:'Open Sans',sans-serif;
      font-size:11px; font-weight:600;
      padding:5px 12px; border-radius:99px;
      border:1.5px solid var(--jg-blue);
      color:var(--jg-blue); background:#fff;
      cursor:pointer; transition:all .2s; white-space:nowrap;
    }
    .jg-chip:hover { background:var(--jg-blue); color:#fff; }

    /* INPUT */
    #jg-input-area {
      padding:10px 12px;
      border-top:.5px solid var(--jg-gray-mid);
      display:flex; gap:8px; align-items:center;
      background:#fff; flex-shrink:0;
    }
    #jg-input {
      flex:1; border:1.5px solid var(--jg-gray-mid); border-radius:22px;
      padding:9px 15px;
      font-family:'Open Sans',sans-serif; font-size:12px;
      outline:none; color:#1a2a3a; background:var(--jg-gray-bg);
      transition:border-color .2s,background .2s;
    }
    #jg-input:focus { border-color:var(--jg-blue); background:#fff; }
    #jg-input::placeholder { color:var(--jg-gray); }
    #jg-send {
      width:36px; height:36px; border-radius:50%;
      background:var(--jg-orange); border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; transition:background .2s,transform .15s;
      box-shadow:0 2px 8px rgba(245,160,51,.35);
    }
    #jg-send:hover { background:var(--jg-orange-l); transform:scale(1.06); }
    #jg-send:disabled { background:var(--jg-gray-mid); box-shadow:none; cursor:not-allowed; transform:none; }

    /* FOOTER */
    #jg-footer {
      padding:5px 12px 8px; text-align:center; background:#fff;
      font-size:9px; color:var(--jg-gray); font-family:'Open Sans',sans-serif;
    }
    #jg-footer b { color:var(--jg-blue); font-weight:600; }

    /* LINKS CLICKEABLES */
    .jg-link {
      display:inline-flex; align-items:center; gap:5px;
      padding:4px 10px; border-radius:99px; font-size:11.5px;
      font-weight:600; text-decoration:none; margin:3px 2px;
      transition:opacity .2s, transform .15s;
    }
    .jg-link:hover { opacity:.85; transform:translateY(-1px); }
    .jg-link-wa  { background:#25D366; color:#fff; }
    .jg-link-tel { background:#1B3A6B; color:#fff; }
    .jg-link-url { background:#F5A033; color:#fff; }
  /* ── Tokens / botones de navegación ── */
  .jg-token-block { display:flex; flex-direction:column; gap:7px; margin-top:8px; }
  .jg-token-btn {
    display:inline-flex; align-items:center; gap:7px;
    padding:8px 14px; border-radius:20px; font-size:13px;
    font-family:inherit; cursor:pointer; border:none;
    text-decoration:none; font-weight:500; transition:opacity .2s;
  }
  .jg-token-btn:hover { opacity:.85; }
  .jg-token-wa  { background:#25D366; color:#fff; }
  .jg-token-tel { background:#f0f0f0; color:#333; }
  .jg-token-nav { background:var(--jg-accent,#0a3d6b); color:#fff; }
  .jg-token-hours { font-size:11px; color:#888; margin-top:2px; }

  /* Bloque de contacto */
  .jg-contact-block { display:flex; flex-direction:column; gap:6px; margin-top:6px; }
  .jg-contact-hours { font-size:11px; color:#888; margin-top:2px; }
    .jg-link svg { flex-shrink:0; }
    .jg-typing {
      display:flex; align-items:center; gap:4px;
      padding:10px 14px; background:#fff;
      border:.5px solid var(--jg-gray-mid);
      border-radius:14px 14px 14px 3px; width:fit-content;
      box-shadow:0 1px 4px rgba(27,58,107,.06);
    }
    .jg-tdot {
      width:7px; height:7px; border-radius:50%;
      animation:jgType 1.2s ease infinite;
    }
    .jg-tdot:nth-child(1){background:var(--jg-gray);}
    .jg-tdot:nth-child(2){background:var(--jg-orange);animation-delay:.2s;}
    .jg-tdot:nth-child(3){background:var(--jg-blue);animation-delay:.4s;}
    @keyframes jgType { 0%,60%,100%{transform:translateY(0);opacity:.5} 30%{transform:translateY(-6px);opacity:1} }
  `;
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────────────────
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <!-- BOTÓN FLOTANTE -->
    <button id="jg-fab" aria-label="Abrir chat de soporte JG Servicios">
      <div id="jg-fab-ring"></div>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F5A033" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span id="jg-fab-badge">1</span>
    </button>

    <!-- VENTANA DEL CHAT -->
    <div id="jg-win" role="dialog" aria-label="Chat de soporte JG Servicios">

      <div id="jg-header">
        <div class="jg-h-blob1"></div>
        <div class="jg-h-blob2"></div>
        <div id="jg-header-top">
          <div id="jg-logo-wrap">
            <img src="images/logo/logo.png" alt="Logo JG Servicios" onerror="this.style.display='none';this.parentElement.innerHTML='<svg width=\\'26\\' height=\\'26\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'#F5A033\\' stroke-width=\\'2.2\\'><path d=\\'M22 12h-4l-3 9L9 3l-3 9H2\\'/></svg>'">
          </div>
          <div id="jg-header-info">
            <span id="jg-header-name">Asistente JG Servicios</span>
            <span id="jg-header-sub"><span class="jg-dot"></span>En línea · Respuesta inmediata</span>
          </div>
          <button id="jg-close" aria-label="Cerrar chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div id="jg-header-bar"></div>
      </div>

      <div id="jg-msgs"></div>

      <div id="jg-chips">
        <button class="jg-chip" data-q="¿Qué productos manejan?">📦 Productos</button>
        <button class="jg-chip" data-q="¿Cómo solicito una cotización?">💰 Cotización</button>
        <button class="jg-chip" data-q="¿Cuáles son sus datos de contacto y horarios?">📞 Contacto</button>
        <button class="jg-chip" data-q="¿En qué zonas hacen entregas?">🚚 Entregas</button>
      </div>

      <div id="jg-input-area">
        <input type="text" id="jg-input" placeholder="Escribe tu pregunta aquí..." maxlength="300" autocomplete="off"/>
        <button id="jg-send" aria-label="Enviar mensaje">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      <div id="jg-footer"><b>JG Servicios Integrales de Chiapas</b></div>
    </div>
  `;
  document.body.appendChild(wrap);

  // ── RUTAS DINÁMICAS ──────────────────────────────────────
  // Detecta si estamos en /pages/ o en la raíz y resuelve la ruta correcta
  function getPath(page) {
    const inPages = window.location.pathname.includes('/pages/');
    return inPages ? page : 'pages/' + page;
  }

  // ── TOKENS HARDCODEADOS ─────────────────────────────────
  // El modelo usa [TOKEN] y el JS lo reemplaza con HTML perfecto
  // Nunca depende de lo que genere el modelo para links/teléfonos

  const SVG_WA  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.336-1.508A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.012-1.374l-.36-.214-3.762.895.952-3.664-.235-.376A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>`;
  const SVG_TEL = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;
  const SVG_NAV = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`;

  // Navegar en la misma pestaña
  function goTo(path) { window.location.href = path; }

  function buildTokens() {
    return {
      '[CONTACTO]': `<div class="jg-token-block">
        <button data-href="${getPath('contacto.html')}" class="jg-token-btn jg-token-nav">${SVG_NAV} Ir a Contacto</button>
        <a href="https://wa.me/529611527706" target="_blank" class="jg-token-btn jg-token-wa">${SVG_WA} WhatsApp: +52 961 152 7706</a>
        <button data-href="${getPath('contacto.html')}" class="jg-token-btn jg-token-tel">${SVG_TEL} Tel: 961 295 8523 / 961 315 7432 / 961 100 6893</button>
        <span class="jg-token-hours">🕐 Lun-Vie 9am-7pm &nbsp;|&nbsp; Sáb 9am-2pm</span>
      </div>`,
      '[WHATSAPP]': `<div class="jg-token-block">
        <a href="https://wa.me/529611527706" target="_blank" class="jg-token-btn jg-token-wa">${SVG_WA} Escríbenos por WhatsApp</a>
      </div>`,
      '[CATALOGO]': `<div class="jg-token-block">
        <button data-href="${getPath('productos.html')}" class="jg-token-btn jg-token-nav">${SVG_NAV} Ver Catálogo de Productos</button>
      </div>`,
      '[SERVICIOS]': `<div class="jg-token-block">
        <button data-href="${getPath('servicios.html')}" class="jg-token-btn jg-token-nav">${SVG_NAV} Ver Servicios</button>
      </div>`,
      '[SUCURSAL]': `<div class="jg-token-block">
        <button data-href="${getPath('sucursal.html')}" class="jg-token-btn jg-token-nav">${SVG_NAV} Ver Sucursal / Farmacia PROMAC</button>
      </div>`,
      '[NOSOTROS]': `<div class="jg-token-block">
        <button data-href="${getPath('nosotros.html')}" class="jg-token-btn jg-token-nav">${SVG_NAV} Conocer más sobre nosotros</button>
      </div>`,
      '[PROVEEDORES]': `<div class="jg-token-block">
        <button data-href="${getPath('proveedores.html')}" class="jg-token-btn jg-token-nav">${SVG_NAV} Ver Proveedores y Marcas</button>
      </div>`,
      '[FAQ]': `<div class="jg-token-block">
        <button data-href="${getPath('faq.html')}" class="jg-token-btn jg-token-nav">${SVG_NAV} Ver Preguntas Frecuentes</button>
      </div>`,
    };
  }

  function applyTokens(text) {
    const tokens = buildTokens();
    Object.entries(tokens).forEach(([token, html]) => {
      text = text.split(token).join(html);
    });
    return text;
  }

  function sanitizeModelText(text) {
    // Eliminar cualquier [texto](url) que el modelo genere
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    // Eliminar tags HTML
    text = text.replace(/<[^>]*>/gi, '');
    // Eliminar atributos HTML sueltos
    text = text.replace(/\s*target="[^"]*"/gi, '');
    text = text.replace(/\s*class="[^"]*"/gi, '');
    text = text.replace(/\s*href="[^"]*"/gi, '');
    // Eliminar URLs con wa.me
    text = text.replace(/https?:\/\/wa\.me\/\S+/gi, '');
    text = text.replace(/wa\.me\/\S*/gi, '');
    // Eliminar caracteres sueltos
    text = text.replace(/["'>]+/g, '');
    text = text.replace(/\s{2,}/g, ' ');
    return text.trim();
  }

  function parseMarkdown(text) {
    text = sanitizeModelText(text);
    text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    text = text.replace(/(?:^|\n)[-*] (.+)/g, '<br>\u2022 $1');
    text = text.replace(/\n{2,}/g, '<br><br>');
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  function parseLinks(text) {
    const SVG_WA  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.336-1.508A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.012-1.374l-.36-.214-3.762.895.952-3.664-.235-.376A9.797 9.797 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>`;
    const SVG_TEL = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;
    const SVG_URL = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`;

    // Dividir el texto en segmentos: dentro de tags HTML vs texto plano
    // Solo procesamos los segmentos de texto plano
    const segments = text.split(/(<[^>]+>)/);
    return segments.map((seg, i) => {
      // Si es un tag HTML (índices impares o empieza con <), no tocar
      if (seg.startsWith('<')) return seg;

      // WhatsApp: +52 seguido de 10 dígitos
      seg = seg.replace(/\+52\s?(\d{3})\s?(\d{3})\s?(\d{4})/g, (match, a, b, c) => {
        const num = `52${a}${b}${c}`;
        return `<a href="https://wa.me/${num}" target="_blank" class="jg-link jg-link-wa">${SVG_WA} ${match}</a>`;
      });

      // Teléfono local: 961 xxx xxxx
      seg = seg.replace(/\b(961)[\s\-]?(\d{3})[\s\-]?(\d{4})\b/g, (match, a, b, c) => {
        // Solo convertir si NO está ya dentro de un link generado
        if (seg.includes('jg-link')) return match;
        return `<a href="tel:+52${a}${b}${c}" class="jg-link jg-link-tel">${SVG_TEL} ${match}</a>`;
      });

      // URLs
      seg = seg.replace(/(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/g, (match) => {
        const href = match.startsWith('http') ? match : 'https://' + match;
        const label = match.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        return `<a href="${href}" target="_blank" class="jg-link jg-link-url">${SVG_URL} ${label}</a>`;
      });

      return seg;
    }).join('');
  }

  // ── LÓGICA ────────────────────────────────────────────────
  const fab    = document.getElementById('jg-fab');
  const badge  = document.getElementById('jg-fab-badge');
  const win    = document.getElementById('jg-win');
  const close  = document.getElementById('jg-close');
  const msgs   = document.getElementById('jg-msgs');
  const chips  = document.getElementById('jg-chips');
  const input  = document.getElementById('jg-input');
  const send   = document.getElementById('jg-send');
  // ── ESTADO ────────────────────────────────────────────────
  let history = JSON.parse(sessionStorage.getItem('jg_history') || '[]');
  let msgLog  = JSON.parse(sessionStorage.getItem('jg_msglog')  || '[]');
  let opened  = false; // solo controla si ya se renderizó en ESTA página

  // Event delegation para botones de navegación del chatbot
  msgs.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-href]');
    if (btn) window.location.href = btn.dataset.href;
  });

  // Renderiza un mensaje directamente en el DOM (sin pasar por sanitize)
  function renderMsg(html, role, time) {
    const div = document.createElement('div');
    div.className = `jg-msg ${role}`;
    const check = role === 'user' ? '<span class="jg-check">✓✓</span>' : '';
    div.innerHTML = `<div class="jg-bubble">${html}</div><div class="jg-meta">${check}<span class="jg-time">${time}</span></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // Restaurar conversación previa desde sessionStorage
  function restoreMsgs() {
    msgLog.forEach(({ role, html, time }) => renderMsg(html, role, time));
    msgs.scrollTop = msgs.scrollHeight;
  }

  // Mensaje de bienvenida (HTML directo, no pasa por sanitize)
  function addWelcome() {
    const html = '¡Hola! 👋 Bienvenido a <strong>JG Servicios Integrales</strong>.<br>Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?';
    const time = getTime();
    renderMsg(html, 'bot', time);
    msgLog.push({ role: 'bot', html, time });
    sessionStorage.setItem('jg_msglog', JSON.stringify(msgLog));
  }

  fab.addEventListener('click', () => {
    win.classList.add('open');
    badge.style.display = 'none';
    if (!opened) {
      if (msgLog.length > 0) {
        restoreMsgs();
      } else {
        addWelcome();
      }
      opened = true;
    }
    input.focus();
  });
  close.addEventListener('click', () => win.classList.remove('open'));

  function getTime() {
    return new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  }


  function addMsg(text, role) {
    const time = getTime();
    let html;
    if (role === 'bot') {
      let t = sanitizeModelText(text);
      t = parseMarkdown(t);
      t = applyTokens(t);
      html = t;
    } else {
      html = text;
    }
    renderMsg(html, role, time);
    msgLog.push({ role, html, time });
    sessionStorage.setItem('jg_msglog', JSON.stringify(msgLog));
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'jg-msg bot'; div.id = 'jg-typing';
    div.innerHTML = `<div class="jg-typing"><div class="jg-tdot"></div><div class="jg-tdot"></div><div class="jg-tdot"></div></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function removeTyping() { document.getElementById('jg-typing')?.remove(); }

  async function sendMessage(text) {
    if (!text.trim()) return;
    chips.style.display = 'none';
    addMsg(text, 'user');
    history.push({ role: 'user', content: text });
    sessionStorage.setItem('jg_history', JSON.stringify(history));
    input.value = '';
    send.disabled = true;
    showTyping();

    try {
      // ── MODO LOCAL: llamada directa a Groq ──
      // Para producción en JettHost, reemplaza todo este bloque try por:
      // const res = await fetch('api/chat.php', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ messages: history })
      // });
      // const data = await res.json();
      // const reply = data.reply || 'Lo siento, hubo un error.';
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history.slice(-6)],
          max_tokens: 300,
          temperature: 0.5
        })
      });
      const data = await res.json();
      removeTyping();
      if (!res.ok) {
        console.error('Groq error:', res.status, data?.error?.message);
        addMsg('Servicio no disponible en este momento. Intenta de nuevo.', 'bot');
        send.disabled = false; input.focus(); return;
      }
      const replyRaw = data.choices?.[0]?.message?.content || 'Lo siento, hubo un error.';
      const reply = sanitizeModelText(replyRaw);
      // Guardar texto plano en historial (sin HTML ni Markdown)
      const replyClean = reply.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      history.push({ role: 'assistant', content: replyClean });
      sessionStorage.setItem('jg_history', JSON.stringify(history));
      addMsg(reply, 'bot');
    } catch (e) {
      removeTyping();
      addMsg('No pude conectarme en este momento. Por favor intenta de nuevo.', 'bot');
    }
    send.disabled = false;
    input.focus();
  }

  send.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });
  document.querySelectorAll('.jg-chip').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.q));
  });
})();
