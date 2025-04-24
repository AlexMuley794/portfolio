// Variables globales
const sections = document.querySelectorAll('section');
const backToTopButton = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Función para mostrar/ocultar el botón "Volver arriba"
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
}

// Función para animar las secciones al hacer scroll
function animateSections() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Aquí puedes añadir la lógica para enviar el formulario
    // Por ejemplo, usando fetch para enviar los datos a un servidor
    
    // Mensaje de éxito temporal
    const submitButton = contactForm.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Mensaje enviado!';
    submitButton.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.backgroundColor = '';
        contactForm.reset();
    }, 3000);
}

// Función para inicializar el modo oscuro/claro
function initThemeToggle() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const root = document.documentElement;
    
    function setTheme(e) {
        if (e.matches) {
            root.style.setProperty('--background-color', '#333');
            root.style.setProperty('--card-color', '#444');
            root.style.setProperty('--text-color', '#fff');
        } else {
            root.style.setProperty('--background-color', '#f5f5f5');
            root.style.setProperty('--card-color', '#fff');
            root.style.setProperty('--text-color', '#333');
        }
    }
    
    setTheme(prefersDarkScheme);
    prefersDarkScheme.addListener(setTheme);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar funcionalidades
    initThemeToggle();
    
    // Añadir event listeners
    window.addEventListener('scroll', () => {
        toggleBackToTop();
        animateSections();
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Animar secciones visibles al cargar la página
    animateSections();
});

// Función para manejar la navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}); 