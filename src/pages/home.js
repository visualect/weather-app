import { renderWeatherPage, API_KEY } from '../index.js';

export function create() {
  const container = document.createElement('div');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const displayError = document.createElement('span');
  const inputWrapper = document.createElement('div');

  input.placeholder = 'City';

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
  displayError.classList.add('err-display');

  inputWrapper.append(input);
  form.append(inputWrapper);
  form.append(displayError);
  container.append(form);

  return container;
}