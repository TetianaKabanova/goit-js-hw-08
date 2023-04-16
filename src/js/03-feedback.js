import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';

const feedbackForm = {
  email: '',
  message: '',
};

populateTextarea();

refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onTextareaInput(event) {
  feedbackForm[event.target.name] = event.target.value;
  const feedbackFormJSON = JSON.stringify(feedbackForm);
  localStorage.setItem(STORAGE_KEY, feedbackFormJSON);
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(feedbackForm);
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
