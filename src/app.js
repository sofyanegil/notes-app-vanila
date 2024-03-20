import './script/components/index.js';
import home from './script/view/home.js';

document.addEventListener('DOMContentLoaded', () => {
  home();
});

const inputBookTitle = document.querySelector('#inputBookTitle');
const inputBookBody = document.querySelector('#inputBookBody');

const setCustomValidity = (element, message) => {
  element.setCustomValidity(message);
};

const clearCustomValidity = (element) => {
  element.setCustomValidity('');
};

const validateField = (event) => {
  const element = event.target;
  clearCustomValidity(element);

  if (element.validity.valueMissing) {
    setCustomValidity(element, 'Wajib diisi.');
  } else if (element.validity.tooShort) {
    setCustomValidity(element, `Minimal ${element.minLength} karakter.`);
  }
};

const showValidationMessage = (element) => {
  const errorMessage = element.validationMessage;
  const connectedValidationId = element.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId ? document.getElementById(connectedValidationId) : null;

  if (connectedValidationEl && errorMessage && !element.validity.valid) {
    connectedValidationEl.innerText = errorMessage;
  } else if (connectedValidationEl) {
    connectedValidationEl.innerText = '';
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const newNote = {
    id: +new Date(),
    title: inputBookTitle.value,
    body: inputBookBody.value,
    createdAt: new Date().toISOString(),
    archived: false,
  };

  document.dispatchEvent(new CustomEvent('add-note', { detail: newNote }));
  inputBookTitle.value = '';
  inputBookBody.value = '';
};

const handleAddNoteEvent = (e) => {
  const notesData = JSON.parse(localStorage.getItem('notesData')) || [];
  notesData.push(e.detail);
  localStorage.setItem('notesData', JSON.stringify(notesData));

  const noteListElement = document.querySelector('note-list');
  const NoteItemElement = document.createElement('note-item');
  NoteItemElement.note = e.detail;
  noteListElement.append(NoteItemElement);
};

inputBookTitle.addEventListener('change', validateField);
inputBookTitle.addEventListener('invalid', validateField);
inputBookTitle.addEventListener('blur', (event) => showValidationMessage(event.target));

inputBookBody.addEventListener('change', validateField);
inputBookBody.addEventListener('invalid', validateField);
inputBookBody.addEventListener('blur', (event) => showValidationMessage(event.target));

document.addEventListener('submit', handleFormSubmit);
document.addEventListener('add-note', handleAddNoteEvent);
