import { resumeData } from "../utils/contantKeys.js";
function About() {
  this.$wrapper = document.querySelector("#about");

  const generateIntroduceDom = () => {
    return `
      <div class="introduce">
        <h2 class="subTit01">안녕하세요, <br />만나서 반가워요 &#x1F44B;</h2>
        <p class="subTxt01">
          저는 웹 퍼블리셔/프론트엔드 <br />
          개발자 김수연입니다.
        </p>
      </div>
    `;
  };

  const generateResumeDom = () => {
    const { resume, skill } = resumeData;
    const resumeList = resume
      .map((data) => {
        return `<p class="boxGray"><span class="data">${data.date}</span>${data.company}</p>`;
      })
      .join("");

    const resumeDom = `
      <div class="resume">
        <dl>
          <dt>이력</dt>
          <dd>${resumeList}</dd>
        </dl>
        <dl>
          <dt>보유스킬</dt>
          <dd>${skill.join(", ")}</dd>
        </dl>
        <a href="/resume" class="moreView">이력서 더보기 +</a>
      </div>
    `;
    return resumeDom;
  };

  const generateButtonDom = () => {
    return `
      <div class="buttonWrap">
        <a href="/career" class="btn btnYellow">경력 기술서 보기 +</a>
        <a href="" class="btn">연락하기</a>
        <p class="copyright">Copyright © Su Yeon KIM 2019. All rights reserved.</p>
      </div>
    `;
  };

  const randerMainInjectDom = () => {
    this.$wrapper.innerHTML += generateIntroduceDom();
    this.$wrapper.innerHTML += generateResumeDom();
    this.$wrapper.innerHTML += generateButtonDom();

    if (window.location.hash === "#resume") {
      console.log("dd");
    }
  };

  this.rander = () => {
    randerMainInjectDom();
  };

  this.rander();
}

export default About;
