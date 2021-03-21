function Resume() {
  console.log("경력기술서");

  this.$wrapper = document.querySelector("#contents");
  this.$wrapper.innerHTML += "경력기술서";
}

export default Resume;
