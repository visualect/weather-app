import { renderWeatherPage, API_KEY } from './app.js';

// eslint-disable-next-line no-unused-vars
export function create() {
  const container = document.createElement('div');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const displayError = document.createElement('span');
  const button = document.createElement('button');
  const inputWrapper = document.createElement('div');

  button.textContent = 'Search';
  input.placeholder = 'City';

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!input.value) return;
    // history.pushState(null, null, `${location.pathname}/city=${input.value}`);
    renderWeatherPage(
      './weather.js',
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`
    );
  });

  container.classList.add('home-container');
  form.classList.add('home__form');
  input.classList.add('home__input');
  button.classList.add('home__btn');
  inputWrapper.classList.add('home__input-wrapper')
  displayError.classList.add('home__err-display')

  inputWrapper.append(input);
  inputWrapper.append(button);
  form.append(inputWrapper);
  form.append(displayError);
  container.append(form);

  return container;
}