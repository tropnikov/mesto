export default class Section {
  #renderedItems;
  #renderer;
  #container;

  constructor({ items, renderer }, containerSelector) {
    this.#renderedItems = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  renderItems = () => {
    this.#renderedItems.forEach((item) => {
      this.#renderer(item);
    });
  };

  addItem = (element) => {
    this.#container.prepend(element);
  };
}
