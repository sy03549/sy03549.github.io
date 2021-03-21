import { mapToTitile } from "../utils/contantKeys.js";
function Resume() {
  this.$wrapper = document.querySelector("#contents");
  this.pathname = window.location.pathname;
  console.log(mapToTitile(this.pathname));

  const resumeDom = `
  
  `;
}

export default Resume;
