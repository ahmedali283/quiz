// Get the form, reset message, and email input elements
var form = document.getElementById('signin-form');
var resetMessage = document.getElementById('reset-message');
var emailInput = document.getElementById('signin-email');
var apiUrl = 'https://mcqapi.onrender.com/api/users/reset-password';


// Add an event listener to the form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  var email = emailInput.value;
  var payload = JSON.stringify({ email: email }); 

   fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
    .then(function (response) {
      if (response.ok) {
        // API response received successfully
        return response.json(); // Parse the response body as JSON
      } else {
        // Handle error case
        console.error('Error:', response.status);
      }
    })
    .then(function (data) {
      if (data.success) {
        // Reset message success
        resetMessage.style.display = 'block';
      }
    })
    .catch(function (error) {
      // Handle fetch error
      console.error('Fetch error:', error);
    });
});

function redirecttomain() {
  window.location.href = "https://muhammadp3.sg-host.com/";
}