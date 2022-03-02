const weatherForm = document.querySelector('form');
const searchData = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  message1.textContent = 'Loading...';
  message2.textContent = '';
  fetch('http://localhost:3000/weather?address=' + searchData.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
          message2.textContent = '';
        } else {
          message1.textContent = '';
          message2.textContent = `In ${data.location} is ${data.forecast.description}. It is ${data.forecast.temperature}, and it feels like ${data.forecast.feelsLike}`;
        }
      });
    }
  );
});
