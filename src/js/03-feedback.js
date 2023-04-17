import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
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
    refs.email.value = feedbackForm.email || '';
    refs.message.value = feedbackForm.message || '';
  }
}

function onTextareaInput(event) {
  feedbackForm[event.target.name] = event.target.value;
  const feedbackFormJSON = JSON.stringify(feedbackForm);
  localStorage.setItem(STORAGE_KEY, feedbackFormJSON);
}

function onFormSubmit(event) {
  event.preventDefault();

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  feedbackForm.email = refs.email.value;
  feedbackForm.message = refs.message.value;
  console.log(feedbackForm);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const objectValues = JSON.parse(savedMessage);

  if (objectValues) {
    feedbackForm = objectValues;
    refs.email.value = objectValues.email || '';
    refs.message.value = objectValues.message || '';
    feedbackForm = objectValues.email || '';
    feedbackForm = objectValues.message || '';
  }
}
