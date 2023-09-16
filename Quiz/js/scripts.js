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
var userId = localStorage.getItem('userID');
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
  let circularProgress = document.querySelector(".circular-progress"),
  progressValue = document.querySelector(".progress-value"),
  titleMsg = document.querySelector(".title-msg");

let progressStartValue = 0,
  progressEndValue = 0,
  speed = 25;

let progress;
// First Progress Circle For 
if (progressStartValue !== 0 && progressStartValue !== null) {
  progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}`;
    circularProgress.style.background = `conic-gradient(#246dec ${progressStartValue * 3.6}deg, #ededed 0deg)`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}


let circularProgress1 = document.querySelector(".c3"),
    progressValue1 = document.querySelector(".p3");

let progressStartValue1 = 0,
    progressEndValue1 = 100,
    speed1 = 0;
let progress1;
if (progressStartValue1 !== 0 && progressStartValue1 !== null) {
let progress1 = setInterval(() => {
    progressStartValue1++;

    progressValue1.textContent = `${progressStartValue1}`;
    circularProgress1.style.background = `conic-gradient(#7d2ae8 ${progressStartValue1 * 3.6}deg, #ededed 0deg)`;

    if(progressStartValue1 == progressEndValue1){
        clearInterval(progress1);
    }    
}, speed1);
}
let circularProgress2 = document.querySelector(".c1"),
    progressValue2 = document.querySelector(".p1");

let progressStartValue2 = 0,
    progressEndValue2 = 100,
    speed2 = 0;

let progress2 = setInterval(() => {
    progressStartValue2++;

  

    if (progressStartValue2 == progressEndValue2) {
        clearInterval(progress2);
    }
}, speed2);

let circularProgress3 = document.querySelector(".c4"),
    progressValue3 = document.querySelector(".p4");

let progressStartValue3 = 0,
    progressEndValue3 = 100,
    speed3 = 0;

let progress3 = setInterval(() => {
    progressStartValue3++;

    
    

    if (progressStartValue3 == progressEndValue3) {
        clearInterval(progress3);
    }
}, speed3);


// API Request
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  userId
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://mcqapi.onrender.com/api/dashboard", requestOptions)
  .then(response => response.json())
  .then(data => {
    // Extract values from API response
    let { testscore, Quizcomplete, topicscomplete, message, maxquizscore } = data[0];

    // Update progress values with API values
    progressEndValue = parseInt(testscore);
    progressEndValue1 = parseInt(maxquizscore);
    progressEndValue2 = parseInt(topicscomplete);
    progressEndValue3 = parseInt(Quizcomplete);

    if(isNaN(progressEndValue)) {
      progressEndValue = 0;
    }
    if(isNaN(progressEndValue1)) {
      progressEndValue1 = 0;
    }
    if(isNaN(progressEndValue3)) {
      progressEndValue3 = 0;
    }


    // Update progress indicators with API values
    progressValue.textContent = `${progressEndValue}%`;
    circularProgress.style.background = `conic-gradient(#246dec ${progressEndValue * 3.6}deg, #ededed 0deg)`;

    progressValue1.textContent = `${progressEndValue1}`;
    circularProgress1.style.background = `conic-gradient(from ${progressEndValue1 * 3.6}deg at 50% 50%, #a300b5, #246dec)`;

    progressValue2.textContent = `${progressEndValue2}`;
    circularProgress2.style.background = `conic-gradient(from ${progressEndValue2 * 36}deg at 50% 50%, #a300b5, #246dec)`;

    progressValue3.textContent = `${progressEndValue3}`;
    circularProgress3.style.background = `conic-gradient(from ${progressEndValue3 * 36}deg at 50% 50%, #a300b5, #246dec)`;

    // Update message
    titleMsg.textContent = message;
  })
  .catch(error => console.log('error', error));
}


document.addEventListener("DOMContentLoaded", function() {
  var topic1Button = document.getElementById("startquiz");

  topic1Button.addEventListener("click", function() {
    localStorage.setItem("topicId", null);
  });
});
