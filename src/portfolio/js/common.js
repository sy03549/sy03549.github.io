import "../css/reset.css";
import "../css/common.css";
import Header from "./components/Header.js";
import About from "./components/About.js";
import Resume from "./components/Resume.js";
import Career from "./components/Career.js";
import { DOMelement } from "./utils/utils.js";

function PortflioCommon() {
  this.pathname = window.location.pathname;

  const appendWrapNode = () => {
    const aboutDom = new DOMelement("div").setId("about").element;
    const contentsDom = new DOMelement("div").setId("contents").element;
    document.body.appendChild(aboutDom);
    document.body.appendChild(contentsDom);
  };

  appendWrapNode();
  this.init = () => {
    document.body.classList.add("work");
    this.Header = new Header();

    if (this.pathname == "/resume") {
      document.body.classList.remove("work");
      this.Resume = new Resume();
      return;
    }
    if (this.pathname == "/career") {
      document.body.classList.remove("work");
      this.Career = new Career();
      return;
    }
    this.About = new About();
  };

  setTimeout(() => {
    document.body.classList.add("reveal");
    this.init();
  }, 1000);
}

new PortflioCommon();
