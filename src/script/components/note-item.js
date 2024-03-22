import showFormattedDate from '../utils/date.js';
import { deleteNote, archiveNote, unarchiveNote } from '../data/api.js';
import { showNotes } from '../../app.js';

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updatedStyle() {
    this._style.textContent = `
      .notes-item {
        box-shadow: 0 5px 10px #0003;
      }

      .notes-item__body {
        background-color: var(--pal4);
        border-left: 5px solid var(--pal1);
        padding: 20px;
        min-height: 200px;
      }

      .notes-item__title {
        font-size: 1.3em;
        font-weight: 900;
        text-decoration: underline;
      }

      .notes-item__date {
        margin: 10px 0;
        font-size: 1em;
        font-weight: 700;
        color: #3e3939;
        background-color: var(--pal1);
        color: #fff;
        width: fit-content;
        padding: 5px;
        border-radius: 5px
      }

      .notes-item__text {
        margin-top: 10px;
        font-size: 1em;
        color: #3e3939;
        line-height: 1.2;
      }

      .notes-item__button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        padding: 10px;
      }

      .btn {
        min-width: 44px;
        min-height: 44px;
        color: #fff;
        padding: 10px;
        border-radius: 10px;
        border: 0;
        cursor: pointer;
        font-size: 0.9rem;
        margin: 0 5px;
      }

      .btn-primary {
        background-color: var(--pal2);
      }

      .btn-primary:hover {
        background-color: #728c7b;
      }

      .btn-danger {
        background-color: var(--pal5);
      }

      .btn-danger:hover {
        background-color: #bb1d3f;
      }
      `;
  }

  render() {
    this._emptyContent();
    this._updatedStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <article class="notes-item" key="${this.note.id}">
      <div class="notes-item__body">
        <p class="notes-item__date">${showFormattedDate(this.note.createdAt)}</p>
        <h3 class="notes-item__title">${this.note.title}</h3>
        <p class="notes-item__text">${this.note.body}</p>
      </div>
      <div class="notes-item__button">
        <button type="button" id="archiveButton" class="btn btn-primary">${this.note.archived ? 'Unarchive' : 'Archive'}</button>
        <button type="button" class="btn btn-danger" id="deleteButton" data-note-id="${this.note.id}">Delete</button>
      </div>
    </article>
    `;

    const archiveButton = this._shadowRoot.querySelector('#archiveButton');
    const deleteButton = this._shadowRoot.querySelector('#deleteButton');

    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();
      await deleteNote(this.note.id);
      await showNotes();
      showNotes();
    });

    archiveButton.addEventListener('click', async (event) => {
      event.preventDefault();
      if (this.note.archived) {
        await unarchiveNote(this.note.id);
        showNotes();
      } else {
        await archiveNote(this.note.id);
        showNotes();
      }
    });
  }
}

customElements.define('note-item', NoteItem);
