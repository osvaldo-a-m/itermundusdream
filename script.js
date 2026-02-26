// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe destination cards
document.querySelectorAll('.destination-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===== FORM HANDLING WITH AUTOMATION INTEGRATION =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// IMPORTANT: Replace this URL with your n8n/Zapier webhook URL
const WEBHOOK_URL = 'https://backyou-n8n.pf0hps.easypanel.host/webhook/11c7b883-9556-4d54-a002-0fd57580ef00';

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Convert FormData to JSON object (ideal for automation tools)
    const formObject = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        destination: formData.get('destination'),
        travelDate: formData.get('travelDate'),
        travelers: formData.get('travelers'),
        budget: formData.get('budget'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') === 'on',
        submittedAt: new Date().toISOString(),
        source: 'Landing Page'
    };

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        // For demonstration purposes (remove when using real webhook)
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form data ready for automation:', formObject);

        // Show success message
        formMessage.textContent = '¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.';
        formMessage.className = 'form-message success';

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

    } catch (error) {
        console.error('Error:', error);

        // Show error message
        formMessage.textContent = 'Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.';
        formMessage.className = 'form-message error';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// ===== DESTINATION CARD CLICK HANDLER =====
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', () => {
        const destination = card.dataset.destination;

        // Pre-fill the form with the selected destination
        const destinationSelect = document.getElementById('destination');
        if (destinationSelect) {
            destinationSelect.value = destination;
        }

        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM VALIDATION ENHANCEMENTS =====
const formInputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'hsl(0, 70%, 50%)';
        } else {
            input.style.borderColor = 'hsl(140, 70%, 50%)';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--color-primary)';
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = 'hsl(0, 70%, 50%)';
    } else {
        emailInput.style.borderColor = 'hsl(140, 70%, 50%)';
    }
});

// Phone validation
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    // Remove non-numeric characters except + and -
    e.target.value = e.target.value.replace(/[^\d+\-\s()]/g, '');
});

// Set minimum date for travel date picker (today)
const travelDateInput = document.getElementById('travelDate');
if (travelDateInput) {
    const today = new Date().toISOString().split('T')[0];
    travelDateInput.setAttribute('min', today);
}

// ===== CONSOLE LOG FOR INTEGRATION SETUP =====
console.log('%c🚀 Travel Agency Landing Page', 'font-size: 20px; font-weight: bold; color: #007bff;');
console.log('%cWebhook Integration Setup:', 'font-size: 14px; font-weight: bold; color: #333;');
console.log('To connect with n8n or Zapier, follow these steps:');
console.log('1. Create a webhook in n8n/Zapier');
console.log('2. Copy the webhook URL');
console.log('3. Replace WEBHOOK_URL in script.js with your actual webhook URL');
console.log('4. Uncomment the fetch code in the form submission handler');
console.log('\nForm data structure:', {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    phone: 'string',
    destination: 'string',
    travelDate: 'date',
    travelers: 'number',
    budget: 'string',
    message: 'string',
    newsletter: 'boolean',
    submittedAt: 'ISO timestamp',
    source: 'Landing Page'
});
