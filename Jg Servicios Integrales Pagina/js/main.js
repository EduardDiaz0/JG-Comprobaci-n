document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // HEADER SÓLIDO EN PÁGINAS INTERNAS
    // ============================================
    const header = document.getElementById('header');
    const isHomePage = !window.location.pathname.includes('/pages/');

    if (header && !isHomePage) {
        // En páginas internas siempre sólido
        header.classList.remove('transparent');
        header.classList.add('scrolled');
    }

    // ============================================
    // MENÚ HAMBURGUESA (MÓVIL)
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera (con pequeño delay para no interferir con el toggle)
        document.addEventListener('click', function (e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                setTimeout(() => {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }, 10);
            }
        });
    }

    // ============================================
    // HEADER - SOMBRA AL HACER SCROLL
    // ============================================
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }
        });
    }

    // ... el resto de tu código continúa exactamente igual ...

    // ============================================
    // ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
    // ============================================
    const animatedElements = document.querySelectorAll(
        '.feature-card, .service-item, .provider-logo, .contact-item'
    );

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }


    // ============================================
    // MARCAR ENLACE ACTIVO EN NAV
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.style.color = 'var(--color-secondary)';
            link.style.fontWeight = '700';
        }
    });


    // ============================================
    // BOTÓN "VOLVER ARRIBA"
    // ============================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 46px;
        height: 46px;
        background-color: var(--color-secondary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'scale(0.8)';
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ============================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS (#)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ============================================
    // VALIDACIÓN DE FORMULARIO DE CONTACTO
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            // Limpiar errores previos
            contactForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });

            // Validar campos requeridos
            contactForm.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.closest('.form-group').classList.add('error');
                    valid = false;
                }
            });

            // Validar email
            const emailField = contactForm.querySelector('[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    emailField.closest('.form-group').classList.add('error');
                    valid = false;
                }
            }

            if (valid) {
                submitForm(contactForm);
            }
        });
    }


    // ============================================
    // ENVÍO DE FORMULARIO VÍA FETCH (AJAX)
    // ============================================
    function submitForm(form) {
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        const formData = new FormData(form);

        const phpPath = window.location.pathname.includes('/pages/') ? '../php/send-email.php' : 'php/send-email.php';
        fetch(phpPath, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showAlert('success', '¡Mensaje enviado! Nos pondremos en contacto pronto.');
                form.reset();
            } else {
                showAlert('danger', 'Ocurrió un error. Intenta de nuevo o llámanos directamente.');
            }
        })
        .catch(() => {
            showAlert('danger', 'Error de conexión. Por favor inténtalo más tarde.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }


    // ============================================
    // MOSTRAR ALERTAS
    // ============================================
    function showAlert(type, message) {
        const existing = document.querySelector('.form-alert');
        if (existing) existing.remove();

        const alert = document.createElement('div');
        alert.className = `alert alert-${type} form-alert`;
        alert.textContent = message;

        const form = document.getElementById('contactForm');
        if (form) { 
            form.insertAdjacentElement('beforebegin', alert);
            alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(() => alert.remove(), 6000);
        }
    }

});