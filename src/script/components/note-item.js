import showFormattedDate from '../utils/date.js';
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
    </article>
    `;
  }
}

customElements.define('note-item', NoteItem);
