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

    // Handle loader
    setTimeout(function () {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.display = "none";
        }
    }, 800); // 0.8 seconds

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission for validation

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        this.submit(); // Submit the form if validation passes

        // Clear the input fields
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
         const form = this;

        // Send the form data using Fetch API
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Redirect to the thank-you page
                window.location.href = 'https://gnidy.com/thank-you.html';
            } else {
                alert('There was an issue submitting the form. Please try again.');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        });
    });

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
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}