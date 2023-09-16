var userId = localStorage.getItem('userID');
if (!userId) {
  window.location.href = "https://muhammadp3.sg-host.com/";
} else {
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


// ---------- CHARTS ----------

// BAR CHART
var barChartOptions = {
  series: [{
    data: [3, 8, 6, 4, 2, 9, 5],
    name: "Marks",
  }],
  chart: {
    type: "bar",
    background: "transparent",
    height: 350,
    toolbar: {
      show: false,
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
      columnWidth: "40%",
    }
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: "#55596e",
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: "#333",
    },
    show: true,
    position: "top",
  },
  stroke: {
    colors: ["transparent"],
    show: true,
    width: 2
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
  xaxis: {
    categories: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
    title: {
      style: {
        color: "#333",
      },
    },
    axisBorder: {
      show: true,
      color: "#55596e",
    },
    axisTicks: {
      show: true,
      color: "#55596e",
    },
    labels: {
      style: {
        colors: "#333",
      },
    },
  },
  yaxis: {
    title: {
      text: "Time Taken",
      style: {
        color:  "#333",
      },
    },
    axisBorder: {
      color: "#55596e",
      show: true,
    },
    axisTicks: {
      color: "#55596e",
      show: true,
    },
    labels: {
      style: {
        colors: "#333",
      },
    },
  }
};

// Fetch data from the API
var url = 'https://mcqapi.onrender.com/api/dashboard/quizTime';
var userId = localStorage.getItem("userID") ;
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
    var adjustedscores = data.map(item => item.adjustedscore);
    

    // Replace topic IDs with corresponding names
   

    // Update the Bar chart data with the adjustedScore values
    barChartOptions.series[0].data = adjustedscores;
    

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
    name: "Time Taken",
    data: [2, 4, 8, 5, 4, 9, 5],
  }, {
    name: "Marks Scored",
    data: [5, 8, 6, 7, 9, 10, 10],
  }],
  chart: {
    type: "area",
    background: "transparent",
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ["#2962ff", "#6500c4"],
  labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5", "Quiz 6", "Quiz 7"],
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: "vertical",
    },
    type: "gradient",
  },
  grid: {
    borderColor: "#55596e",
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: "#333",
    },
    show: true,
    position: "top",
  },
  markers: {
    size: 6,
    strokeColors: "#1b2635",
    strokeWidth: 3,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    axisBorder: {
      color: "#55596e",
      show: true,
    },
    axisTicks: {
      color: "#55596e",
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: "#333",
      },
    },
  },
  yaxis: 
  [
    {
      title: {
        text: "Time Taken",
        style: {
          color: "#333",
        },
      },
      labels: {
        style: {
          colors: ["#333"],
        },
      },
    },
    {
      opposite: true,
      title: {
        text: "Marks Scored",
        style: {
          color:  "#333",
        },
      },
      labels: {
        style: {
          colors: ["#333"],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  }
};

var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();
}