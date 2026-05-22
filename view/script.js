// Scroll suave para los enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de cambio de color en navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animación de fade-in para elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Aplicar observer a tarjetas de servicios
document.querySelectorAll('.service-card, .client-card').forEach(element => {
    element.classList.add('fade-in-hidden');
    observer.observe(element);
});

// Manejo de modales del equipo
const teamCards = document.querySelectorAll('.team-card');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

teamCards.forEach(card => {
    card.addEventListener('click', function() {
        const teamId = this.getAttribute('data-team');
        const modal = document.getElementById(`${teamId}-modal`);
        if (modal) {
            modal.classList.add('active');
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const modal = this.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
        }
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// LIGHTBOX - Modal de imagen expandida
const imageModal = document.getElementById('imageModal');
const imageModalContent = document.querySelector('.image-modal-content');
const imageModalClose = document.querySelector('.image-modal-close');

// Click en tarjetas de clientes para expandir imagen
const clientCards = document.querySelectorAll('.client-card');
clientCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
        e.stopPropagation();
        const img = this.querySelector('img');
        if (img) {
            imageModalContent.src = img.src;
            imageModalContent.alt = img.alt;
            imageModal.classList.add('active');
        }
    });
});

// Seleccionar otras imágenes expandibles (no client-card)
// (excluyendo logos del navbar, icono de contacto, y otras imágenes que no queremos expandir)
const expandableImages = document.querySelectorAll(
    'img:not(.contact-icon):not(.logo-img):not(.modal-image):not(.client-card img)'
);

// Abrir modal al hacer clic en una imagen (no client-card)
expandableImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        imageModalContent.src = this.src;
        imageModalContent.alt = this.alt;
        imageModal.classList.add('active');
    });
});

// Cerrar modal al hacer clic en la X
imageModalClose.addEventListener('click', function() {
    imageModal.classList.remove('active');
});

// Cerrar modal al hacer clic en el fondo (pero no en la imagen)
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        imageModal.classList.remove('active');
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        imageModal.classList.remove('active');
    }
});