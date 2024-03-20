class FooterBar extends HTMLElement {
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
        background-color: var(--pal1);
        padding: 20px;
        text-align: center;
        display: grid;
        gap: 10px;
        justify-content: center;
        align-items: center;
        bottom: 0;
        box-shadow: 0 -5px 10px #0003;
        color: var(--pal4)
      }

      a {
        color: var(--pal4);
        text-decoration: none;
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
      <p>Made with ❤️ by <a href="https://linkedin.com/in/sofyanegi/" target="_blank" rel="noopener noreferrer">Sofyan Egi</a></p>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
