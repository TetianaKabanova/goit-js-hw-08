import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('input'),
};

const STORAGE_KEY = 'feedback-form-state';

let feedbackForm = {
  email: '',
  message: '',
};

populateTextarea();

reloadPage();

refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function reloadPage() {
  if (feedbackForm) {
    refs.input.value = feedbackForm.email || '';
    refs.textarea.value = feedbackForm.message || '';
  }
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  feedbackForm[event.target.name] = event.target.value;
  const feedbackFormJSON = JSON.stringify(feedbackForm);
  localStorage.setItem(STORAGE_KEY, feedbackFormJSON);
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(feedbackForm);
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  feedbackForm = {};
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage === null) {
    return;
  }

  refs.textarea.value = savedMessage.message || '';
  refs.input.value = savedMessage.email || '';
  feedbackForm.email = savedMessage.email || '';
  feedbackForm.message = savedMessage.message || '';
}
