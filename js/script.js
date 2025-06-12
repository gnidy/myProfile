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

    // Handle 404 for invalid page paths and sections
    const validPages = ['/', '/index.html', 'https://gnidy.com/']; // Add other valid pages if needed
    const currentPage = window.location.pathname;
    const validSectionIds = ['about-me', 'services', 'project', 'contact']; // Add other valid section IDs
    
    // Check if current page is valid
    if (!validPages.includes(currentPage)) {
        // If not valid and not a valid section hash, redirect to 404
        const hash = window.location.hash;
        if (!hash || !validSectionIds.includes(hash.substring(1))) {
            window.location.href = '/404.html';
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const currentPage = window.location.pathname;
        const hash = window.location.hash;
        if (!validPages.includes(currentPage) && (!hash || !validSectionIds.includes(hash.substring(1)))) {
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

                // Reset form only after thank-you page has loaded
                window.location.href = 'thank-you.html';
                // Form will be reset on thank-you page load
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