export class Container {
  #container = document.createElement("div");

  constructor(className) {
    this.#container.className = className;
  }

  install = () => {
    document.body.appendChild(this.#container);
  };
}