var userId = localStorage.getItem('userID');
if (!userId) {
  window.location.href = "https://muhammadp3.sg-host.com/";
} else {
// Get a reference to the link element
var cancelLink = document.querySelector('.cancelsub');

// Attach an event listener to the link
cancelLink.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default behavior of the link

  // Define the API endpoint URL
  var apiUrl = 'https://mcqapi.onrender.com/api/users/unsubscribe';

  // Define the JSON payload
  var payload = JSON.stringify({ userId });

  // Configure the fetch request
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
        // Redirect to the specified URL
        window.location.href = 'https://muhammadp3.sg-host.com/';

        // Clear local storage
        localStorage.clear();
      } else {
        // Handle error case
        console.error('Error:', response.status);
      }
    })
    .catch(function (error) {
      // Handle fetch error
      console.error('Fetch error:', error);
    });
});
}