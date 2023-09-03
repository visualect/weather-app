import { renderWeatherPage, API_KEY } from '../index.js';

export function create() {
  const container = document.createElement('div');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const inputWrapper = document.createElement('div');

  input.placeholder = 'Enter the name of the city';

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!input.value) return;
    renderWeatherPage(
      './pages/weather.js',
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`
    );
  });

  container.classList.add('home-container');
  form.classList.add('home__form');
  input.classList.add('home__input');
  inputWrapper.classList.add('home__input-wrapper');

  inputWrapper.append(input);
  form.append(inputWrapper);
  container.append(form);

  return container;
}