(async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js')
      if (registration.installing) {
        console.log('Service worker is installing')
      } else if (registration.waiting) {
        console.log('Service worker is successfully installed')
      } else if (registration.active) {
        console.log('Service Worker is active')
      }
      console.log(registration)
    } catch(err) {
      console.error('Registration is failed with ' + err.message)
    }
  }
})()

export const API_KEY = 'ff5b40f69b1fc2af3eb111af200f6a4b';
const root = document.getElementById('root');

async function load(src) {
  if (src.endsWith('.js')) {
    return await import(src);
  } else {
    return fetch(src).then(res => res.json());
  }
}

async function renderHome(js) {
  return await import(js).then(jsModule => {
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
      if (loadedData.cod === '404') throw new SearchError();
      history.replaceState(null, null, `${loadedData.name}`);
      const page = jsModule.create(loadedData);
      root.innerHTML = '';
      root.append(page);
    })
    .catch(err => {
      if (err instanceof SearchError) {
        alert(err.message);
      } else {
        throw err;
      }
    });
}

const pathname = window.location.pathname;
if (pathname === '/') {
  renderHome('./pages/home.js');
} else {
  renderWeatherPage('./pages/weather.js', `https://api.openweathermap.org/data/2.5/weather?q=${pathname.slice(1)}&appid=${API_KEY}`);
}

window.addEventListener('popstate', () => {
  const pathname = location.pathname;
  if (pathname === '/') {
    renderHome('./pages/home.js');
  } else {
    renderWeatherPage('./pages/weather.js', `https://api.openweathermap.org/data/2.5/weather?q=${pathname.slice(1)}&appid=${API_KEY}`);
  }
});

class SearchError extends Error {
  constructor() {
    super('Incorrect city name or city does not exist');
  }
}
