class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _gutter = 18;

  static get observedAttributes() {
    return ['gutter'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  _updatedStyle() {
    this._style.textContent = `
      h2 {
        background-color: #ddd;
        border-bottom: 5px solid rgba(0,0,0,.5);
        text-align: center;
        font-size: 2rem;
        padding: 10px;
      }

      .notes-list {
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: ${this._gutter}px;
        justify-content: center;
      }`;
  }

  set gutter(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;
    this._gutter = value;
  }

  get gutter() {
    return this._gutter;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this._updatedStyle();

    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <h2>Notes</h2>
      <div class="notes-list">
        <slot>
        </slot>
      </div>
    `;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'gutter':
        this._gutter = newValue;
        break;
    }

    this.render();
  }
}

customElements.define('note-list', NoteList);
