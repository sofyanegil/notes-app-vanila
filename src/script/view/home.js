import getNotes from '../data/local.js';

const home = () => {
  const noteListElement = document.querySelector('note-list');

  const showNotes = () => {
    let notesData = localStorage.getItem('notesData');
    if (!notesData) {
      notesData = getNotes();
      localStorage.setItem('notesData', JSON.stringify(notesData));
    } else {
      notesData = JSON.parse(notesData);
    }

    const NoteItemElements = notesData.map((note) => {
      const NoteItemElement = document.createElement('note-item');
      NoteItemElement.note = note;
      return NoteItemElement;
    });
    noteListElement.append(...NoteItemElements);
  };

  showNotes();
};

export default home;
