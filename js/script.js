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
            validRoutes.push(`#${id}`);
        }
    });
    validRoutes.push('/404.html');
    validRoutes.push('/thank-you.html');

    // Check if current path is valid
    const currentPath = window.location.pathname + window.location.hash;
    if (!validRoutes.includes(currentPath)) {
        // If not valid, redirect to 404 page
        window.location.href = '/404.html';
    }

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const newPath = window.location.pathname + window.location.hash;
        if (!validRoutes.includes(newPath)) {
            window.location.href = '/404.html';
        }
    });

    // Handle direct URL access with hash
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Scroll to the section
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Prevent 404 redirect for valid sections
            return;
        }
        // Only redirect to 404 if section doesn't exist
        window.location.href = '/404.html';
    }

    // Add smooth scroll behavior for section links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add scroll behavior for direct URL access
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Add scroll behavior for section links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
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
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            // Validate all fields
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Submit form using fetch
            try {
                const response = await fetch('https://formspree.io/f/mnndbavr', {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Form submission failed');
                }

                window.location.href = 'thank-you.html';
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}