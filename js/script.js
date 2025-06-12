document.querySelector('.menu-toggle').addEventListener('click', (event) => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Hide the menu if clicking outside
document.addEventListener('click', (event) => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Update current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Handle routing
    const validRoutes = ['/'];
    
    // Add valid routes for each section
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const id = section.id;
        if (id) {
            validRoutes.push(`/${id}`);
        }
    });

    // Check if current path is valid
    const currentPath = window.location.pathname;
    if (!validRoutes.includes(currentPath)) {
        // If not valid, redirect to 404 page
        window.location.href = '/404.html';
    }

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const newPath = window.location.pathname;
        if (!validRoutes.includes(newPath)) {
            window.location.href = '/404.html';
        }
    });

    // Handle loader
    setTimeout(function () {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.display = "none";
        }
    }, 800); // 0.8 seconds



    // Animation
    const animateBoxes = document.querySelectorAll(".animate-box");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.index * 30;
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    animateBoxes.forEach((box, index) => {
        box.dataset.index = index;
        observer.observe(box);
    });

    // Form submission
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Get form values
            // Validate email
            const email = this.querySelector('input[type="email"]').value;
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Submit form using fetch
            try {
                const response = await fetch('https://formspree.io/f/mnndbavr', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Form submission failed');
                }

                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('There was an issue submitting the form. Please try again.');
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}