// Main JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('nav a');

    // Intersection Observer for Section Animations
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to animate only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Back to Top Button Logic
    const toggleBackToTop = () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form AJAX Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('.submit-btn');
            const formMessage = document.getElementById('form-message');
            const originalText = submitButton.textContent;

            // Show sending state
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            formMessage.style.display = 'none';

            try {
                const formData = new FormData(contactForm);

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // Success
                submitButton.textContent = '¡Mensaje Enviado!';
                submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                formMessage.textContent = '✓ Tu mensaje ha sido enviado correctamente. Te responderé pronto.';
                formMessage.style.display = 'block';
                formMessage.style.color = '#10b981';
                formMessage.style.fontWeight = '600';
                formMessage.style.fontSize = '1.1rem';

                // Reset form
                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                    submitButton.style.background = '';
                    formMessage.style.display = 'none';
                }, 5000);
            } catch (error) {
                // Error
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';

                formMessage.textContent = '✗ Hubo un error. Por favor, intenta de nuevo.';
                formMessage.style.display = 'block';
                formMessage.style.color = '#ef4444';
                formMessage.style.fontWeight = '600';

                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Add parallax effect to hero image
    const heroImage = document.querySelector('.rounded-image');
    if (heroImage) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (window.innerWidth - clientX) / 50;
            const y = (window.innerHeight - clientY) / 50;

            heroImage.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        });
    }
});