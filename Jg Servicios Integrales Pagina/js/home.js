/* ============================================
   HOME.JS - LÓGICA EXCLUSIVA DEL INICIO
============================================ */

document.addEventListener('DOMContentLoaded', function () {


    // ============================================
    // HEADER: TRANSPARENTE → SÓLIDO AL SCROLL
    // ============================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
            header.classList.remove('transparent');
            header.classList.add('scrolled');
        } else {
            header.classList.add('transparent');
            header.classList.remove('scrolled');
        }
    }, { passive: true });


    // ============================================
    // REVEAL AL SCROLL
    // ============================================
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));


    // ============================================
    // CONTADOR ANIMADO (STATS)
    // ============================================
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, 16);
    }


    // ============================================
    // PANEL DINÁMICO DE SERVICIOS
    // ============================================
    const serviceItems = document.querySelectorAll('.service-item[data-service]');
    const panelIcon    = document.getElementById('panelIcon');
    const panelTitle   = document.getElementById('panelTitle');
    const panelDesc    = document.getElementById('panelDesc');
    const panelFeatures = document.getElementById('panelFeatures');

    const serviceData = {
        distribucion: {
            icon: '🧴',
            title: 'Distribución de Insumos Hospitalarios',
            desc: 'Distribuidores autorizados de material médico y de curación para hospitales, clínicas y centros de salud públicos y privados en todo Chiapas.',
            features: ['Gasas, vendas y apósitos', 'Catéteres y sondas', 'Guantes y jeringas descartables', 'Equipo de protección personal (EPP)', 'Consumibles quirúrgicos']
        },
        farmaceutico: {
            icon: '💊',
            title: 'Distribución Farmacéutica',
            desc: 'Medicamentos y productos farmacéuticos con certificación COFEPRIS. Cadena de frío garantizada para productos que lo requieren.',
            features: ['Medicamentos de patente y genéricos', 'Soluciones parenterales', 'Productos biológicos con cadena de frío', 'Antibióticos y antivirales', 'Productos oncológicos']
        },
        equipo: {
            icon: '🔬',
            title: 'Equipo Médico',
            desc: 'Venta y distribución de equipo médico especializado con asesoría técnica incluida en cada compra. Garantía y respaldo post-venta.',
            features: ['Equipo de diagnóstico', 'Mobiliario hospitalario', 'Equipo de urgencias y UCI', 'Equipo de laboratorio', 'Equipos quirúrgicos']
        },
        capacitacion: {
            icon: '📋',
            title: 'Asesoría y Capacitación',
            desc: 'Talleres y capacitaciones sobre uso correcto de materiales médicos, manejo de equipo y mejores prácticas hospitalarias.',
            features: ['Talleres para personal de enfermería', 'Capacitación en uso de equipo', 'Asesoría en compras', 'Soporte técnico post-venta']
        },
        licitaciones: {
            icon: '📄',
            title: 'Licitaciones Públicas',
            desc: 'Experiencia comprobada en procesos de compra de gobierno. Participamos con IMSS, ISSSTE, Secretaría de Salud de Chiapas y más.',
            features: ['Registro en CompraNet', 'Documentación legal completa', 'Precios competitivos', 'Historial comprobado con gobierno']
        },
        mantenimiento: {
            icon: '🛠️',
            title: 'Mantenimiento de Equipo',
            desc: 'Servicio técnico especializado para mantenimiento preventivo y correctivo de equipo médico. Extendemos la vida útil de tus equipos.',
            features: ['Mantenimiento preventivo programado', 'Reparaciones correctivas', 'Calibración de equipos', 'Contratos anuales disponibles']
        }
    };

    function updatePanel(serviceKey) {
        const data = serviceData[serviceKey];
        if (!data || !panelIcon) return;

        // Fade out
        const panelContent = document.getElementById('panelContent');
        panelContent.style.opacity = '0';
        panelContent.style.transform = 'translateY(10px)';

        setTimeout(() => {
            panelIcon.textContent    = data.icon;
            panelTitle.textContent   = data.title;
            panelDesc.textContent    = data.desc;
            panelFeatures.innerHTML  = data.features.map(f => `<li>${f}</li>`).join('');

            // Fade in
            panelContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            panelContent.style.opacity = '1';
            panelContent.style.transform = 'translateY(0)';
        }, 200);
    }

    serviceItems.forEach(item => {
        item.addEventListener('click', function () {
            serviceItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            updatePanel(this.dataset.service);
        });

        item.addEventListener('mouseenter', function () {
            serviceItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            updatePanel(this.dataset.service);
        });
    });


    // ============================================
    // BOTÓN SCROLL TOP
    // ============================================
    const scrollBtn = document.getElementById('scrollTopBtn');

    if (scrollBtn) {
        window.addEventListener('scroll', function () {
            scrollBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // Menú hamburguesa manejado por main.js

});