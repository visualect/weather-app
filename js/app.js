export const API_KEY = 'bd4f968086b92c6cd351be53e08c8589';
const root = document.getElementById('root');
const params = new URLSearchParams(location.search);
const currentCity = params.get('city');

export function getCurrentWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(res => res.json())
    .then(json => json);
}

// function getWeatherForecast(city) {
//   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
//     .then(res => res.json())
//     .then(json => console.log(json));
// }

function load(src) {
  if (src.endsWith('.js')) {
    return import(src);
  } else {
    return fetch(src).then(res => res.json());
  }
}

export default function renderHome(js) {
  return import(js).then(jsModule => {
    const page = jsModule.create();
    root.innerHTML = '';
    root.append(page);
  });
}

export function renderWeatherPage(js, data) {
  Promise.all([
    load(js),
    load(data),
  ])
    .then(([jsModule, loadedData]) => {
      if (loadedData.cod === '404') throw Error('Incorrect city name or city does not exist');
      const input = document.querySelector('.home__input')
      history.pushState(null, null, `${location.pathname}/city=${input.value}`);
      const page = jsModule.create(loadedData);
      root.innerHTML = "";
      root.append(page);
    })
    .catch(err => {
      const errDisplay = document.querySelector('.home__err-display');
      errDisplay.textContent = err.message;
    });
}

renderHome('./home.js');