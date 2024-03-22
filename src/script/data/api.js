const baseUrl = 'https://notes-api.dicoding.dev/v2';
import Swal from 'sweetalert2';

const showError = async (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
};

const getNotes = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes`, { method: 'GET' });
    const { data } = await response.json();
    return data;
  } catch (error) {
    showError(error.message);
  }
};

const getNotesArchived = async () => {
  try {
    const response = await fetch(`${baseUrl}/notes/archived`, {
      method: 'GET',
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    showError(error.message);
  }
};

const addNote = async (title, body) => {
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    showError(error.message);
  }
};

const archiveNote = async (note_id) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${note_id}/archive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    showError(error.message);
  }
};

const unarchiveNote = async (note_id) => {
  try {
    const response = await fetch(`${baseUrl}/notes/${note_id}/unarchive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    showError(error.message);
  }
};

const deleteNote = async (note_id) => {
  try {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this note!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmDelete.isConfirmed) {
      const response = await fetch(`${baseUrl}/notes/${note_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    }
  } catch (error) {
    showError(error.message);
  }
};

export { getNotes, getNotesArchived, addNote, archiveNote, unarchiveNote, deleteNote };
