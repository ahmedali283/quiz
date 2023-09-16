const sign_in_btn = document.querySelector("#signinbtn");
const sign_up_btn = document.querySelector("#signupbtn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

document.getElementById("signup-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Retrieve form values
  var firstName = document.getElementById("signup-firstname").value;
  var lastName = document.getElementById("signup-lastname").value;
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
  var dob = document.getElementById("signup-dob").value;
  var year = document.getElementById("signup-year").value;

  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashedPassword = Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
 

  // Create JSON payload
  var payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    dob: dob,
    year: year
  };

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(payload),
    redirect: 'follow'
  };

  // Send the POST request
  fetch("https://mcqapi.onrender.com/api/users/register", requestOptions)
  .then(response => response.json())
  .then(data => {
    // Check if POST request was successful
    if (data.success) {
      var userId = data.userId;
      localStorage.setItem("userID", userId);
      window.location.href = "https://muhammadp3.sg-host.com/Pricing/index.html";
    } else {
      // Handle unsuccessful registration here
      var errorElement = document.getElementById("error");
      errorElement.style.display = 'block';
      errorElement.textContent = "Registration failed: " + data.error;
    }
  })
  
  .catch(error => console.log('error', error));
})


document.addEventListener("DOMContentLoaded", function() {
  var signInForm = document.getElementById("signin-form");
  signInForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the input field values
    var email = document.getElementById("signin-email").value;
    var password = document.getElementById("signin-password").value;

    const encoderr = new TextEncoder();
    const dataa = encoderr.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataa);
    const hashedPasswordd = Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
  

    // Create an object with the form data
    var formData = {
      email: email,
      password: hashedPasswordd
    };

    // Convert the form data to JSON
    var jsonData = JSON.stringify(formData);

    // Send a POST request to the API
    fetch("https://mcqapi.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => {

      if (data.success) {
        // Save userId in local storage
        localStorage.setItem("userID", data.userId);

        // Display userId in console
        console.log("User ID:", data.userId);

        // Retrieve sessionId from local storage        

        // Redirect to the dashboard upon successful login
        window.location.href = "https://muhammadp3.sg-host.com/dashboard/index.html";
      } else {
        // Handle login failure
        var errorElement1 = document.getElementById("error1");
        errorElement1.style.display = 'block';
        errorElement1.textContent = "Login failed: " + data.error;      
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  });
});

