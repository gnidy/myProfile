

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("list")) {
        // Toggle the menu visibility
        document.querySelector("header nav ul").classList.toggle("visible");
    } else {
        // Hide the menu if clicking outside
        document.querySelector("header nav ul").classList.remove("visible");
    }
});



// Form Validation
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]');
  const email = form.querySelector('input[type="email"]');
  const message = form.querySelector('textarea');

  // Check if any required fields are empty
  if (name.value.trim() === '' && email.value.trim() === '' && message.value.trim() === '') {
    return sweetAlert()
  } // ok

  // Check if the email is valid               there wrong here about what the wrong
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  if (!emailPattern.test(email.value.trim())) {
    sweetAlertEmail()
    return; // Stop form submission if email is invalid
  }else if (name.value.trim() === '' )  {
    return sweetAlertEmptyName()
}

  // Simulate form submission (you can add AJAX to actually send the data)
  if (name.value.trim() !== '' && email.value.trim() !== '') {
    sweetAlertName(name.value)
    form.reset(); // Clear the form after submission
  } else {
    e.preventDefault()
  }
});


