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

var userId = localStorage.getItem('userID');
if (!userId) {
  window.location.href = "https://muhammadp3.sg-host.com/";
} else {
  // ---------- CHARTS ----------
  // BAR CHART FOR TOPIC WISE PERFORMANCE
  var barChartOptions = {
    series: [{
      data: [],
      name: "Marks",
    }],
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false
      },
    },
    colors: [
      "#2962ff",
      "#d50000",
      "#2e7d32",
      "#ff6d00",
      "#583cb3",
    ],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: "Marks Scored"
      }
    }
  };

  // Topic ID to Name Mapping
  var topicIdToName = {
    1: "Ordering Numbers",
    2: "Rounding",
    3: "Find the Number",
    4: "Ratios and Proportion"
  };

  // Fetch data from the API
  var url = 'https://mcqapi.onrender.com/api/dashboard/materedTopics';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Extract the adjustedScore values from the API response
      var adjustedScores = data.map(item => item.adjustedScore);
      var topicNames = data.map(item => item.questionTopic); // Use "questionTopic" from the API response

      // Update the Bar chart data with the adjustedScore values
      barChartOptions.series[0].data = adjustedScores;
      barChartOptions.xaxis.categories = topicNames;

      var masteredtopic = document.querySelector('.topicsmastered');
      masteredtopic.textContent = barChartOptions.series[0].data.length;

      // Render the Bar chart
      var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
      barChart.render();
    })
    .catch(error => {
      console.error('Error:', error);
    });

  // AREA CHART
  var areaChartOptions = {
    series: [{
      name: 'Marks Scored',
      data: []
    }, {
      name: 'Time Taken',
      data: []
    }],
    chart: {
      height: 300,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ["#4f35a1", "#246dec"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
    markers: {
      size: 0
    },
    yaxis: [
      {
        title: {
          text: 'Marks Score',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Time Taken',
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    }
  };
  var url1 = 'https://mcqapi.onrender.com/api/dashboard/quizTime';

  fetch(url1, {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Extract the adjustedScore values from the API response
      var adjustedScores = data.map(item => item.adjustedScore);
      var QuizTime = data.map(item => item.QuizTime);
      var latestscore = adjustedScores.slice(0, 5);
      var latesttime = QuizTime.slice(0, 5);

      // Update the Bar chart data with the adjustedScore values
      areaChartOptions.series[0].data = latestscore;
      areaChartOptions.series[1].data = latesttime;

      // Render the Bar chart
      var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
      areaChart.render();
    })
    .catch(error => {
      console.error('Error:', error);
    });

  let finalresult = document.querySelector(".finalresult");
  let topicscompleted = document.querySelector(".topicscomp");
  let highscore = document.querySelector(".highscore");

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
    let {testscore, Quizcomplete, maxquizscore, topicscomplete, message } = data[0];
    let finalResultValue = parseInt(testscore);
    let highScoreValue = parseInt(maxquizscore);
    
    // Check if finalResultValue and highScoreValue are NaN, and replace them with 0 if needed
    if (isNaN(finalResultValue)) {
      finalResultValue = 0;
    }
    if (isNaN(highScoreValue)) {
      highScoreValue = 0;
    }
    
    finalresult.textContent = finalResultValue;
    topicscompleted.textContent = topicscomplete;
    highscore.textContent = highScoreValue;
  })
  .catch(error => console.log('error', error));
}

