export class DOMelement {
  constructor(tag) {
    this.element = document.createElement(tag);
  }

  setId(id) {
    this.element.id = id;
    return this;
  }

  addClass(className) {
    this.element.classList.add(className);
    return this;
  }

  addAttribute(attrName, attrValue = "") {
    this.element.setAttribute(attrName, attrValue);
    return this;
  }

  addInnerHTML(text) {
    this.element.innerHTML = text;
    return this;
  }

  addSrc(url) {
    this.element.src = url;
    return this;
  }
}
