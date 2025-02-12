const apiKey = "1e3e8f230b6064d27976e41163a82b77";
let isCelsius = true;

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const errorMessage = document.getElementById("error-message");

    if (!city) {
        errorMessage.innerText = "Please enter a city name";
        errorMessage.style.display = "block";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            errorMessage.innerText = "City not found! Try again.";
            errorMessage.style.display = "block";
            return;
        }

        errorMessage.style.display = "none";

        document.getElementById("cityName").innerText = `Weather in ${data.name}`;
        document.getElementById("temperature").innerText = `${data.main.temp}°C`;
        document.getElementById("weather").innerText = `Weather: ${data.weather[0].description}`;
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("temperature").dataset.celsius = data.main.temp;
        document.getElementById("temperature").dataset.fahrenheit = (data.main.temp * 9/5 + 32).toFixed(2);

        isCelsius = true;
        document.getElementById("toggleTemp").innerText = "Switch to °F";

        updateBackground(data.weather[0].main);
    } catch (error) {
        errorMessage.innerText = "Error fetching data!";
        errorMessage.style.display = "block";
    }
}

function toggleTemperature() {
    const tempElement = document.getElementById("temperature");

    if (isCelsius) {
        tempElement.innerText = `${tempElement.dataset.fahrenheit}°F`;
        document.getElementById("toggleTemp").innerText = "Switch to °C";
    } else {
        tempElement.innerText = `${tempElement.dataset.celsius}°C`;
        document.getElementById("toggleTemp").innerText = "Switch to °F";
    }

    isCelsius = !isCelsius;
}

function updateBackground(weatherCondition) {
    let backgroundImage = "";
    switch (weatherCondition.toLowerCase()) {
        case "clear":
            backgroundImage = "url('clear sky.jpg')";
            break;
        case "clouds":
            backgroundImage = "url('cloudy.jpg')";
            break;
        case "rain":
            backgroundImage = "url('Rainy.jpg')";
            break;
        case "snow":
            backgroundImage = "url('snow.jpg')";
            break;
        case "thunderstorm":
            backgroundImage = "url('thunderstorm.jpg')";
            break;
        case "haze":
            backgroundImage = "url('haze.jpg')";
            break;    
        default:
            backgroundImage = "url('clear sky.jpg')";
            break;
    }
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark");
    this.innerText = document.body.classList.contains("dark") ? "🔆" : "🌙";
});
