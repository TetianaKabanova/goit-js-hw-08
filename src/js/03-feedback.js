import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputChange, 500));
form.addEventListener('submit', onFormSubmit);

function onInputChange(event) {
  const feedbackForm = {
    email: form.email.value,
    message: form.message.value,
  };

  const feedbackFormJSON = JSON.stringify(feedbackForm);
  localStorage.setItem(LOCALSTORAGE_KEY, feedbackFormJSON);
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(feedbackForm);
  form.reset();
}

function populateTexarea() {
  const savedMessage = localStorage.getItem('feedback-form-state');

  if (savedMessage) {
    console.log(savedMessage);
  }
}
