var userId = localStorage.getItem('userID');
var success = document.getElementById('success');
if (!userId) {
  window.location.href = "https://muhammadp3.sg-host.com/";
} else {
  var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}
const logoutLink = document.querySelector('.logout-btn');
logoutLink.addEventListener('click', handleLogout);

function handleLogout(event) {
  event.preventDefault(); // Prevent the default link behavior

  const apiUrl = 'https://mcqapi.onrender.com/api/users/logout';

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Clear the localStorage if the API call was successful
        localStorage.clear();
      }
      
      // Redirect to the specified URL
      window.location.href = 'https://muhammadp3.sg-host.com/';
    })
    .catch(error => {
      console.error('An error occurred during logout:', error);
      // Handle the error condition as needed
    });
}
// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}



// Retrieve the submit button element
// Retrieve the submit button element by ID
const submitButton = document.getElementById('submit-button');
    const success = document.getElementById('success');

    submitButton.addEventListener('click', async () => {
      // Retrieve the input values from the form
      const oldPassword = document.getElementById('old-password').value;
      const newPassword = document.getElementById('new-password').value;
      const retypeNewPassword = document.getElementById('retype-password').value;

      // Retrieve the user ID from the local storage
      const userId = localStorage.getItem('userID');

      // Check if the new password matches the retype password
      if (newPassword === retypeNewPassword) {
        try {
          // Hash the old and new passwords using your provided code
          const oldPasswordHash = await hashPassword(oldPassword);
          const newPasswordHash = await hashPassword(newPassword);

          // Create the request payload with hashed passwords
          const payload = {
            oldPass: oldPasswordHash,
            pass: newPasswordHash,
            userId: userId
          };

          // Send the POST request to the API endpoint
          const response = await fetch('https://mcqapi.onrender.com/api/users/change-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const data = await response.json();
            // Display the response data in the console
            console.log(data);
            success.style.display = 'block';
          } else {
            throw new Error('Error: ' + response.status);
          }
        } catch (error) {
          // Handle any errors that occurred during the request
          console.error(error);
        }
      } else {
        success.textContent = "Re-Type Password Not Correct! Refresh & Try Again";
        success.style.display = 'block';
      }
    });
}
