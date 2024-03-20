class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updatedStyle() {
    this._style.textContent = `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--pal1);
        padding: 20px;
        position: fixed;
        width:100%;
        top: 0;
        box-shadow: 0 5px 10px #0003;
        z-index: 3;
        color: var(--pal4);
        height: 75px;
      }

      img {
        width: 30px;
        height: 30px;
      }

      .notes-header {
        font-size: 1.5rem;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updatedStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <img src="https://notes.sofyanegi.my.id/icons/logo.svg" alt="logo" />
      <h1>Notes Apps</h1>
    `;
  }
}

customElements.define('app-bar', AppBar);
