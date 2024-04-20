const apiKey = "5c25f8b7e489e8439fa050e843e4eee4"; // Replace YOUR_API_KEY with your actual API key

document.addEventListener("DOMContentLoaded", function () {
  $("#city-selector").select2({
    placeholder: "Select a city",
    allowClear: true,
    data: [
      { id: "London", text: "London" },
      { id: "New York", text: "New York" },
      { id: "Tokyo", text: "Tokyo" },
      // Add more cities or load them via an API
    ],
  });
});

function getWeather() {
  const city = $("#city-selector").val();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      document.getElementById("weather").innerHTML = `
                <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                    <div class="card-header">${city.toUpperCase()}</div>
                    <div class="card-body">
                        <h5 class="card-title">${temperature.toFixed(1)}°C</h5>
                        <p class="card-text">${weatherDescription.toUpperCase()}</p>
                        <img src="${iconUrl}" alt="Weather icon">
                    </div>
                </div>`;
    })
    .catch((err) => {
      console.error("Failed to fetch weather data:", err);
      document.getElementById("weather").textContent =
        "Failed to load weather data.";
    });
}

// Optional: Auto-refresh weather every 5 minutes
setInterval(getWeather, 5 * 60 * 1000); // 5 minutes in milliseconds
