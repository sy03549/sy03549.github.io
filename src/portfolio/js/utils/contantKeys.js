export const mapToTitile = (pathname) => {
  const pathBy = {
    work: "포트폴리오",
    resume: "이력서",
    career: "경력기술서",
  };
  return pathBy[pathname];
};
export const resumeData = {
  name: "김수연",
  birth: "1995.11.29",
  phone: "010-4624-3549",
  email: "sy03549@gmail.com",
  resume: [
    { date: "2019.06", company: "(주)유니드컴즈 입사" },
    { date: "2019.01", company: "(주)무노스 퇴사" },
    { date: "2017.05", company: "(주)무노스 입사" },
    { date: "2017.02", company: "계원예술대학교 졸업" },
    { date: "2015.03", company: "계원예술대학교 입학" },
    { date: "2014.02", company: "송우고등학교 졸업" },
    { date: "2011.03", company: "송우고등학교 입학" },
  ],
  skill: ["HTML5", "CSS3", "Javascript", "Jquery"],
};
