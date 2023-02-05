import { renderWeatherPage, API_KEY } from './app.js';

export function create(data) {
  const container = document.createElement('div');
  const weatherWrapper = document.createElement('div');
  const map = document.createElement('div');
  const inputWidget = document.createElement('form');
  const weatherWidget = document.createElement('div');
  const tempWidget = document.createElement('div');
  const windWidget = document.createElement('div');
  const cityDetailsWidget = document.createElement('div');

  const input = document.createElement('input');
  input.placeholder = 'City';
  inputWidget.append(input);
  input.classList.add('weather-input');
  inputWidget.addEventListener('submit', event => {
    event.preventDefault();
    history.replaceState(null, null, `${input.value}`);
    renderWeatherPage(
      './weather.js',
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`
    );
  });
  weatherWrapper.append(inputWidget);

  const weatherInfo = document.createElement('p');
  const weatherDescription = document.createElement('p');
  const weatherIcon = document.createElement('img');
  weatherInfo.textContent = data.weather[0].main;
  weatherDescription.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherWidget.append(weatherInfo);
  weatherWidget.append(weatherDescription);
  weatherWidget.append(weatherIcon);
  weatherWrapper.append(weatherWidget);

  const tempMain = document.createElement('p');
  const tempFeelsLike = document.createElement('p');
  const tempMin = document.createElement('p');
  const tempMax = document.createElement('p');
  const tempPressure = document.createElement('p');
  const tempHumidity = document.createElement('p');

  const windSpeed = document.createElement('p');
  const windDeg = document.createElement('p');


  const cityName = document.createElement('p');
  const cityCountry = document.createElement('p');
  const citySunrise = document.createElement('p');
  const citySunset = document.createElement('p');
  cityName.textContent = data.name;
  cityCountry.textContent = data.sys.country;
  citySunrise.textContent = `Sunrise: ${convertTime(data.sys.sunrise)}`;
  citySunset.textContent = `Sunset: ${convertTime(data.sys.sunset)}`;
  cityDetailsWidget.append(cityName);
  cityDetailsWidget.append(cityCountry);
  cityDetailsWidget.append(citySunrise);
  cityDetailsWidget.append(citySunset);
  cityName.classList.add('city__name');
  cityCountry.classList.add('city__country');
  citySunrise.classList.add('city__sunrise');
  citySunset.classList.add('city__sunset');
  cityDetailsWidget.classList.add('city');
  container.append(cityDetailsWidget);



  container.classList.add('weather-container');
  weatherWrapper.classList.add('weather-wrapper');
  map.classList.add('weather-map');

  container.append(weatherWrapper);
  container.append(map);

  return container;
}

function convertTime(timestamp) {
  const time = new Date(timestamp * 1000);
  const convertedTime = `${time.getHours()}:${time.getMinutes()}`;
  return convertedTime;
}