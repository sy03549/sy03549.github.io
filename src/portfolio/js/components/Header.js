import { mapToTitile } from "../utils/contantKeys.js";
function Header() {
  this.$wrapper = document.querySelector("#contents");
  this.pathname = window.location.pathname;
  const generateUtilDom = () => {
    const pathText = this.pathname === "/" || this.pathname === "" ? "work" : this.pathname.replace("/", "");
    return `
    <div class="topUtil">
      <ul class="breadcrumb">
        <li class="home"><a href="/">Home</a></li>
        <li>${pathText}</li>
      </ul>
      <div id="menu"></div>
      <div class="wrap">
        <h1 class="subTit01">${mapToTitile(pathText)}</h1>\
      </div>
    </div>
  `;
  };
  this.rander = () => {
    this.$wrapper.innerHTML += generateUtilDom();
  };
  this.rander();
}

export default Header;
