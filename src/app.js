import './script/components/index.js';
import './styles/styles.css';
import { addNote, getNotes, getNotesArchived } from './script/data/api.js';

const showSpinner = () => {
  document.getElementById('spinner').style.display = 'flex';
};
const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
};
const showNotes = async () => {
  const activeNoteListElement = document.querySelector('note-list:not([id="note-archive"])');

  const archivedNoteListElement = document.querySelector('note-list[id="note-archive"]');

  showSpinner();
  const activeNotes = await getNotes();
  const archivedNotes = await getNotesArchived();

  const createNoteElement = (note) => {
    const noteItemElement = document.createElement('note-item');
    noteItemElement.note = note;
    return noteItemElement;
  };

  const appendNotesToElement = (notes, element) => {
    notes.forEach((note) => {
      const noteItemElement = createNoteElement(note);
      element.appendChild(noteItemElement);
    });
  };

  activeNoteListElement.innerHTML = '';
  archivedNoteListElement.innerHTML = '';

  if (activeNotes.length === 0) {
    const noActiveNotesParagraph = document.createElement('p');
    noActiveNotesParagraph.textContent = 'No active notes found.';
    activeNoteListElement.appendChild(noActiveNotesParagraph);
  } else {
    appendNotesToElement(activeNotes, activeNoteListElement);
  }

  if (archivedNotes.length === 0) {
    const noArchivedNotesParagraph = document.createElement('p');
    noArchivedNotesParagraph.textContent = 'No archived notes found.';
    archivedNoteListElement.appendChild(noArchivedNotesParagraph);
  } else {
    appendNotesToElement(archivedNotes, archivedNoteListElement);
  }
  hideSpinner();
};

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
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !element.validity.valid) {
    connectedValidationEl.innerText = errorMessage;
  } else if (connectedValidationEl) {
    connectedValidationEl.innerText = '';
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  inputBookTitle.addEventListener('change', validateField);
  inputBookTitle.addEventListener('invalid', validateField);
  inputBookTitle.addEventListener('blur', (event) => showValidationMessage(event.target));
  inputBookBody.addEventListener('change', validateField);
  inputBookBody.addEventListener('invalid', validateField);
  inputBookBody.addEventListener('blur', (event) => showValidationMessage(event.target));

  if (inputBookTitle.validity.valid && inputBookBody.validity.valid) {
    const newNote = {
      title: inputBookTitle.value,
      body: inputBookBody.value,
    };
    await addNote(newNote.title, newNote.body);
    inputBookTitle.value = '';
    inputBookBody.value = '';
    showNotes();
  }
};

document.addEventListener('DOMContentLoaded', () => showNotes());
document.addEventListener('submit', handleFormSubmit);

document.addEventListener('click', (event) => {
  if (event.target.id === 'bookSubmit') {
    handleFormSubmit(event);
  }
});

export { showNotes };
