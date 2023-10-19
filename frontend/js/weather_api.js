const api = {
    key: "77278187e14ff4191735bfb0e76d7643",
    base: "https://api.openweathermap.org/data/2.5/"
  };


  const city = 'Pretoria';

  async function fetchWeather() {
    try {
      const response = await fetch(`${api.base}weather?q=${city}&appid=${api.key}`);
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  function displayWeather(data) {
    const weatherWidget = document.getElementById('weather-data');
    const temperature = (data.main.temp - 273.15).toFixed(1); 
    const weatherInfo = `
      <div class="text-xl font-bold mb-2">${data.name}</div>
      <div class="text-lg">${temperature}°C, ${data.weather[0].description}</div>
    `;
    weatherWidget.innerHTML = weatherInfo;
  }

  
  fetchWeather();

 
  setInterval(fetchWeather, 600000);