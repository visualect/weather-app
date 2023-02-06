import { renderWeatherPage, API_KEY } from './app.js';

export function create(data) {
  const container = document.createElement('div');
  container.classList.add('weather-container');

  createCityInfo(container, data);
  createSearchForm(container);
  createWeatherInfo(container, data);

  return container;
}

function convertTime(timestamp) {
  const time = new Date(timestamp * 1000);
  const convertedTime = `${time.getHours()}:${time.getMinutes()}`;
  return convertedTime;
}

function createCityInfo(container, data) {
  const cityContainer = document.createElement('div');
  const cityName = document.createElement('p');
  const cityCountry = document.createElement('p');
  const citySunrise = document.createElement('p');
  const citySunset = document.createElement('p');

  cityName.textContent = data.name;
  cityCountry.textContent = data.sys.country;
  citySunrise.textContent = `Sunrise: ${convertTime(data.sys.sunrise)}`;
  citySunset.textContent = `Sunset: ${convertTime(data.sys.sunset)}`;

  cityName.classList.add('city__name');
  cityCountry.classList.add('city__country');
  citySunrise.classList.add('city__sunrise');
  citySunset.classList.add('city__sunset');
  cityContainer.classList.add('city-container');

  cityContainer.append(cityName);
  cityContainer.append(cityCountry);
  cityContainer.append(citySunrise);
  cityContainer.append(citySunset);
  container.append(cityContainer);
}

function createSearchForm(container) {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.placeholder = 'City';
  form.append(input);
  form.addEventListener('submit', event => {
    event.preventDefault();
    history.replaceState(null, null, `${input.value}`);
    renderWeatherPage(
      './weather.js',
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`
    );
  });
  form.classList.add('weather-form');
  input.classList.add('weather-input');
  container.append(form);
}

function createWeatherInfo(container, data) {
  const weatherInfoContainer = document.createElement('div');
  weatherInfoContainer.classList.add('weather-info-container');
  container.append(weatherInfoContainer);

  const weatherWidget = document.createElement('div');
  const weatherInfo = document.createElement('p');
  const weatherDescription = document.createElement('p');
  const weatherIcon = document.createElement('img');
  const weatherWrapper = document.createElement('div');

  weatherInfo.textContent = data.weather[0].main;
  weatherDescription.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  weatherWidget.classList.add('weather-widget');
  weatherInfo.classList.add('weather-info');
  weatherDescription.classList.add('weather-desc');
  weatherIcon.classList.add('weather-icon');
  weatherWrapper.classList.add('weather-wrapper');

  weatherWrapper.append(weatherInfo);
  weatherWrapper.append(weatherDescription);
  weatherWidget.append(weatherIcon);
  weatherWidget.append(weatherWrapper);
  weatherInfoContainer.append(weatherWidget);



  const windWidget = document.createElement('div');
  const windIcon = document.createElement('img');
  const windIconWrapper = document.createElement('div');
  const windWrapper = document.createElement('div');
  const windHeading = document.createElement('h2');
  const windSpeed = document.createElement('p');
  const windDeg = document.createElement('p');

  windIcon.src = '../img/wind.svg';
  windHeading.textContent = 'Wind';
  windSpeed.textContent = `Speed: ${data.wind.speed} m/s`;
  windDeg.innerHTML = `Deg: ${data.wind.deg}&deg;`; // Добавить значок градусов

  windWidget.classList.add('wind-widget');
  windIconWrapper.classList.add('wind-icon-wrapper');
  windIcon.classList.add('wind-icon');
  windWrapper.classList.add('wind-wrapper');
  windHeading.classList.add('wind-heading');
  windSpeed.classList.add('wind-speed');
  windDeg.classList.add('wind-deg');

  windIconWrapper.append(windIcon);
  windWidget.append(windIconWrapper);
  windWrapper.append(windHeading);
  windWrapper.append(windSpeed);
  windWrapper.append(windDeg);
  windWidget.append(windWrapper);
  weatherInfoContainer.append(windWidget);


  const tempWidget = document.createElement('div');
  const tempMain = document.createElement('p');
  const tempFeelsLike = document.createElement('p');
  const tempMin = document.createElement('p');
  const tempMax = document.createElement('p');
  const tempPressure = document.createElement('p');
  const tempHumidity = document.createElement('p');

  tempWidget.innerHTML =
  `<div class='temp-main-widget'>
  <p class='temp-widget-text'>Temperature</p>
  <p class='temp-main'>${convertTemperature(data.main.temp)}&deg;</p>
  </div>`;
  tempWidget.classList.add('temp-widget');

  weatherInfoContainer.append(tempWidget);

}

function convertTemperature(t) {
  let c = Math.round(t - 273.15);
  return c;
}