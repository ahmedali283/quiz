var userId = localStorage.getItem('userID');
if (!userId) {
  window.location.href = "https://muhammadp3.sg-host.com/";
} else {
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

fetch("https://mcqapi.onrender.com/api/topics/complete", {
  body: JSON.stringify({"userId" : userId}),
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const topics = data.map(topic => topic.questionTopic);
    const percentages = data.map(percentage => percentage.Percentage_Attempted);
    const percentage = data.map(item => {
      const percentageValue = parseFloat(item.Percentage_Attempted.replace('%', ''));
      return Math.min(percentageValue, 100);
    });
    console.log(percentages);

    const skillBoxes = document.querySelectorAll('.skill-box');
    

    if (topics.length > skillBoxes.length) {
      const numDuplicates = topics.length - skillBoxes.length;
      for (let i = 0; i < numDuplicates; i++) {
        const originalSkillBox = skillBoxes[0]; // Assuming you want to duplicate the first skill-box
        const clonedSkillBox = originalSkillBox.cloneNode(true);
        originalSkillBox.parentNode.appendChild(clonedSkillBox);
      }
    }
    
    const titleElements = document.querySelectorAll('.title');
    titleElements.forEach((element, index) => {
      element.textContent = `${index + 1}. ${topics[index]}`;
    });
    const SkillBoxes = document.querySelectorAll('.skill-box');

    SkillBoxes.forEach((box, index) => {
      const skillPerElement = box.querySelector('.skill-per');
      const widthValue = percentages[index]; // Get the corresponding width value
      setWidth(skillPerElement, widthValue);
    });
    function setWidth(element, widthValue) {
      element.style.width = `${widthValue}%`;
    }

    const toolElements = document.querySelectorAll('.tooltip');
    toolElements.forEach((tool, index) => {
        tool.textContent = `${parseInt(percentages[index])}%`; 
        });
    

    // Add click event listener to each button element
    const buttonElements = document.querySelectorAll('.button');
    buttonElements.forEach((button, index) => {
      button.addEventListener("click", function() {

        // Get the topic ID based on the button's index
        const topicId = data[index].TopicId;

        // Save the topic ID in local storage
        localStorage.setItem("topicId", topicId);
          // Set the width of the skill-per element based on the percentage
          

        

        
      });
    
    });
  })
  .catch(error => console.log(error));




  
    
      
    }
      
   
    