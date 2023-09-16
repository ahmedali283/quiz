// SIDEBAR TOGGLE
var userId = localStorage.getItem('userID');
if (!userId) {
  window.location.href = "https://muhammadp3.sg-host.com/";
} else {
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




fetch("https://mcqapi.onrender.com/api/topics", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const topics = data.map((topic, index) => `${index + 1}. ${topic.questionTopic}`);
    const titleElements = document.querySelectorAll('.title');
    titleElements.forEach((element, index) => {
      element.textContent = topics[index];
    });
  })
  .catch(error => console.log(error));
}