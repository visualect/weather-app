export const API_KEY = 'ff5b40f69b1fc2af3eb111af200f6a4b';
const root = document.getElementById('root');

function load(src) {
  if (src.endsWith('.js')) {
    return import(src);
  } else {
    return fetch(src).then(res => res.json());
  }
}

function renderHome(js) {
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
      if (loadedData.cod === '404') throw Error('Incorrect city name or city does not exist'); // Create own error when city does not exist
      const page = jsModule.create(loadedData);
      root.innerHTML = '';
      root.append(page);
    })
    .catch(err => {
      const errDisplay = document.querySelector('.home__err-display');
      errDisplay.textContent = err.message;
    });
}

const pathname = location.pathname;
if (pathname === '/') {
  renderHome('./home.js');
} else {
  renderWeatherPage('./weather.js', `https://api.openweathermap.org/data/2.5/weather?q=${pathname.slice(1)}&appid=${API_KEY}`);
}

window.addEventListener('popstate', () => {
  const pathname = location.pathname;
  if (pathname === '/') {
    renderHome('./home.js');
  } else {
    renderWeatherPage('./weather.js', `https://api.openweathermap.org/data/2.5/weather?q=${pathname.slice(1)}&appid=${API_KEY}`);
  }
});