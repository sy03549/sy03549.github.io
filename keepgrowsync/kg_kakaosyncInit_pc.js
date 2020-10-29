/*===== append method 추가(IE버전) :: !!삭제하면 안돼요!! =====*/
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty("append")) {
      return;
    }
    Object.defineProperty(item, "append", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });

        this.appendChild(docFrag);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
/*===== append method 추가(IE버전) :: !!삭제하면 안돼요!! =====*/

//최상위 div 생성
(function () {
  var keepgrowDiv = document.createElement("div");
  keepgrowDiv.setAttribute("id", "keepgrowLogin");
  document.body.appendChild(keepgrowDiv);
})();

var keepgrowSync = document.getElementById("keepgrowLogin");

//DOM
var domCollection = {
  headerDOM: (function () {
    var html = '<div id="KG_header">';
    html +=
      '<div class="backBtn" onclick="history.go(-1);return false;">뒤로가기</div><h1 class="shopName"><a href="/">' +
      KG_userInfo.shopName +
      "</a></h1></div>";
    return html;
  })(),
  sectionDOM: '<div id="KG_section"></div>',
  kakaoLoginDOM: (function () {
    var html = '<div id="kakaoLogin" class="contents">';
    html += '<h2 class="title">로그인</h2>';
    html +=
      '<p class="text">아이디와 비밀번호 입력하기 귀찮으시죠?<br>카카오로 1초 만에 로그인 하세요.</p>';
    html += '<a class="btn btnKakao">카카오 1초 로그인/회원가입</a></div>';
    return html;
  })(),
  kakaoJoinDOM: (function () {
    var html = '<div id="kakaoJoin" class="contents">';
    html += '<h2 class="title">회원가입</h2>';
    html +=
      '<p class="text">아이디, 비밀번호, 이름, 휴대번호 입력하기 귀찮으시죠?<br>카카오로 1초 만에 회원가입 하세요.</p>';
    html += '<a class="btn btnKakao">카카오 1초 회원가입</a></div>';
    return html;
  })(),
  memberLoginDOM: (function () {
    var html = '<div id="memberLogin" class="contents">';
    html +=
      '<ul class="tabMenu"><li class="active"><a href="#member">일반회원 로그인</a></li><li><a href="#noMember">비회원 배송조회</a></li></ul>';
    html += '<div id="formWrap"></div></div>';
    return html;
  })(),
  afterMemberLoginDOM: (function () {
    var html = '<div id="memberLogin" class="contents">';
    html += '<h2 class="title">로그인 상태입니다.</h2>';
    html += '<p class="text">잠시 후 메인페이지로 이동합니다.</p>';
    html += '<p class="sec"><span class="num">3</span>초</p>';
    html += '<a href="/" class="btn redirectBtn">메인으로 바로가기</a>';
    html += "</div>";
    return html;
  })(),
  normalLoginFormDOM: (function () {
    var html = '<div id="normalLogin_id">';
    html +=
      '<p class="text">아이디와 비밀번호 입력을 통해 로그인할 수도 있어요.</p>';
    html += '<div class="inputBox"></div>';
    html += '<button class="btn loginBtn">로그인</button>';
    html +=
      '<a href="/order/orderform.html?basket_type=A0000&amp;delvtype=A&amp;delvtype=A" class="btn nomemberBuyBtn">비회원 구매</a>';
    html +=
      '<div class="utilMenu"><a href="/member/id/find_id.html">아이디 찾기</a><a href="/member/passwd/find_passwd_info.html">비밀번호 찾기</a><a href="/member/join.html" class="right">일반회원가입</a></div>';
    return html;
  })(),
  orderLoginFormDOM: (function () {
    var html = '<div id="orderLogin_id">';
    html +=
      '<p class="text">비회원의 경우<br>주문시의 주문번호로 주문조회가 가능합니다.</p>';
    html += '<div class="inputBox"></div>';
    html += '<button class="btn nomemberLoginBtn">확인</button>';
    return html;
  })(),
  memberJoinDOM:
    '<div id="memberJoin" class="contents"><p class="btn joinBtn">일반회원가입</p></div>',
  idLinkageTitleDOM: (function () {
    var html = '<h2 class="title">로그인</h2>';
    html +=
      '<p class="text">아래 아이디로 로그인을 하시면 연동이 완료됩니다.</p>';
    return html;
  })(),
  footerDOM: (function () {
    var html = '<div id="KG_footer">';
    html += '<a class="ment" target="_blank"><b></b><span></span></a>';
    html += '<a class="copyright" target="_blank">Powered by KeepGrow</a>';
    html += "</div>";
    return html;
  })(),
};

keepgrowSync.innerHTML =
  '<div class="syncWrap">' +
  domCollection.headerDOM +
  domCollection.sectionDOM +
  domCollection.footerDOM +
  "</div>";

//sns 로그인 체크
var injectSnsLoginForm = function () {
  var snsLoginDOM = document.createElement("div");
  var allAnchorTag = document.querySelectorAll(".xans-member-login a");

  snsLoginDOM.id = "snsLogin";
  snsLoginDOM.className = "contents";
  snsLoginDOM.innerHTML = '<ul class="snsLoginBox"></ul>';

  var newArr = [];
  for (i = 0; i < allAnchorTag.length; i++) {
    var pushData = allAnchorTag[i].getAttribute("onclick");
    newArr.push(pushData);
  }

  var trueData = newArr.filter(function (item, idx, array) {
    return array.indexOf(item) === idx;
  });

  for (i = 0; i < trueData.length; i++) {
    if (trueData[i] !== "" && trueData[i] !== null) {
      snsLoginSort(["naver", "facebook", "google", "line", "apple"]);
    }
  }

  function snsLoginSort(opt) {
    opt.forEach(function (el) {
      if (trueData[i].indexOf(el) !== -1) {
        var snsLoginBtnWrap = snsLoginDOM.querySelector(".snsLoginBox");
        var saveKey =
          '<li class="btn_' +
          el +
          '"><a onclick="' +
          trueData[i] +
          '">' +
          el +
          "로 로그인</a></li>";
        snsLoginBtnWrap.innerHTML += saveKey;
      }
    });
  }

  //sns 로그인 1개일 경우
  var snsLoginCnt = snsLoginDOM.querySelectorAll(".snsLoginBox li");
  if (snsLoginCnt.length > 0) {
    keepgrowSync.querySelector("#KG_section").appendChild(snsLoginDOM);
  } else if (snsLoginCnt.length == 1) {
    document.querySelector("#snsLogin .snsLoginBox li").style.width = "100%";
  }
};

//일반 로그인
var injectNomalLoginForm = function () {
  var cafeMemberLogin = document.querySelector(".xans-member-login");
  cafeMemberLogin === null ? afterUserlogin() : beforeUserlogin();

  function afterUserlogin() {
    injectFooterInfo("로그인", "pc_LogIn");
    keepgrowSync.querySelector("#KG_section").innerHTML =
      domCollection.afterMemberLoginDOM;

    var count = 3;
    var counter = setInterval(function () {
      count--;
      if (count <= 0) {
        clearInterval(counter);
        document.querySelector("#memberLogin .redirectBtn").click();
      }
      document.querySelector("#memberLogin .sec .num").innerText = count;
    }, 1000);
  }
  function beforeUserlogin() {
    var cafeMemberForm = document.querySelector(".xans-member-login")
      .parentNode;
    var cafeMemberFormId = cafeMemberForm.getAttribute("id");
    var memeberIdInput = cafeMemberForm.querySelector("#member_id");
    var memeberPwInput = cafeMemberForm.querySelector("#member_passwd");

    memeberIdInput.setAttribute("placeholder", "아이디");
    memeberPwInput.setAttribute("placeholder", "비밀번호");

    document.querySelector(".xans-member-login").outerHTML =
      domCollection.normalLoginFormDOM;
    document.querySelector("#normalLogin_id .inputBox").append(memeberIdInput);
    document.querySelector("#normalLogin_id .inputBox").append(memeberPwInput);
    document.querySelector("#memberLogin #formWrap").append(cafeMemberForm);

    var loginBtn = document.querySelector("#memberLogin .loginBtn");
    loginBtn.setAttribute(
      "onclick",
      "MemberAction.login(" + cafeMemberFormId + "); return false;"
    );

    //아이디&비밀번호 입력시 아이디를 입력하세요 alert 노출 방지
    function loginInputFocus(event) {
      var sLoginKeyInput = document.querySelector("#sLoginKey");
      if (sLoginKeyInput == null) {
        var form = $("#" + cafeMemberFormId);
        setLoginKey(form);
      }
      memeberPwInput.removeEventListener("focus", loginInputFocus, true);

      document.addEventListener("keydown", function (e) {
        if (e.keyCode == "13") {
          e.preventDefault();
        }
      });
    }
    memeberPwInput.addEventListener("focus", loginInputFocus, true);
  }
};

//주문조회 로그인
var injectOrderLoginForm = function () {
  orderLoginTabFtn();
  var cafeOrderHistoryForm = document.querySelector("#historyNoLoginForm");
  var orderNameInput = cafeOrderHistoryForm.querySelector("#order_name");
  var orderIdInput = cafeOrderHistoryForm.querySelector("#order_id");
  var orderPwInput = cafeOrderHistoryForm.querySelector("#order_password");

  orderNameInput.setAttribute("placeholder", "주문자명");
  orderIdInput.setAttribute("placeholder", "주문번호 (-) 포함");
  orderPwInput.setAttribute("placeholder", "비회원주문 비밀번호");

  document.querySelector(".xans-myshop-orderhistorynologin").outerHTML =
    domCollection.orderLoginFormDOM;
  document.querySelector("#orderLogin_id .inputBox").append(orderNameInput);
  document.querySelector("#orderLogin_id .inputBox").append(orderIdInput);
  document.querySelector("#orderLogin_id .inputBox").append(orderPwInput);
  document.querySelector("#memberLogin #formWrap").append(cafeOrderHistoryForm);
  document.querySelector("#orderLogin_id").style.display = "none";

  var nomemberLoginBtn = document.querySelector(
    "#memberLogin .nomemberLoginBtn"
  );
  nomemberLoginBtn.setAttribute(
    "onclick",
    "$" + "(" + "#historyNoLoginForm" + ").submit();"
  );
};

//주문조회로그인 :: 탭기능
var orderLoginTabFtn = function () {
  var tabMenu = document.querySelectorAll("#memberLogin .tabMenu a");
  for (i = 0; i < tabMenu.length; i++) {
    tabMenu[i].addEventListener("click", function () {
      this.parentNode.classList.add("active");
      if (this.getAttribute("href") == "#member") {
        tabMenu[1].parentNode.classList.remove("active");
        document.querySelector("#normalLogin_id").style.display = "block";
        document.querySelector("#orderLogin_id").style.display = "none";
      } else {
        tabMenu[0].parentNode.classList.remove("active");
        document.querySelector("#normalLogin_id").style.display = "none";
        document.querySelector("#orderLogin_id").style.display = "block";
      }
    });
  }
};

var injectFooterInfo = function (text, utm) {
  document.querySelector("#KG_footer .ment b").innerHTML =
    "카카오 1초 " + text + " 이란?";

  if (text.indexOf("로그인/회원가입") !== -1) text = "로그인/가입";
  if (text.indexOf("회원가입") !== -1) text = "가입";
  document.querySelector("#KG_footer .ment span").innerHTML =
    "카카오 싱크를 활용한 간편 " + text + " 기능입니다.";

  //utm 파라미터 작업
  var company;
  window.kgSync.queue.forEach(function (queue) {
    if (typeof queue === "object") {
      company = queue;
    }
  });
  var campaign = company.domain.split(".");
  var footLink = keepgrowSync.querySelector("#KG_footer .copyright");
  footLink.setAttribute(
    "href",
    "//app.keepgrow.com/admin/products/process-templates/71?utm_source=sync&utm_medium=" +
      campaign[0] +
      "&utm_campaign=" +
      utm
  );

  var userLandingLink = keepgrowSync.querySelector("#KG_footer .ment");
  userLandingLink.setAttribute(
    "href",
    "//app.keepgrow.com/admin/landing/90?utm_source=sync&utm_medium=" +
      campaign[0] +
      "&utm_campaign=" +
      utm
  );
};

//카카오싱크 버튼
var injectKakaoSync = function () {
  var kakaoSyncBtn = document.querySelector("#keepgrowLogin .btnKakao");
  if (kakaoSyncBtn) {
    kakaoSyncBtn.setAttribute(
      "onclick",
      "MemberAction.kakaosyncLogin('" + KG_userInfo.accessKey + "')"
    );
  }
};

//파라미터 값 가져오기
var getParameter = function () {
  var url = window.location.search;
  var urlSplit = url.split("&");
  for (var i = 0, result = {}; i < urlSplit.length; i++) {
    urlSplit[i] = urlSplit[i].split("=");
    result[urlSplit[i][0]] = decodeURIComponent(urlSplit[i][1]);
  }
  return result;
};

window.onload = (function () {
  var windowUrl = window.location.pathname;
  //모달창 오픈시 body 스크롤 잠금
  document
    .querySelector("body")
    .setAttribute(
      "style",
      "position:fixed;height:100%;overflow-y:hidden;opacity:1;"
    );
  switch (windowUrl) {
    case "/member/login.html":
      var paraname = window.location.search;
      injectFooterInfo("로그인/회원가입", "pc_LogIn");
      keepgrowSync.querySelector("#KG_section").innerHTML =
        domCollection.kakaoLoginDOM + domCollection.memberLoginDOM;
      injectSnsLoginForm();
      injectNomalLoginForm();

      //구매로그인
      if (paraname.indexOf("noMember=1") !== -1) {
        document.querySelector(
          "#normalLogin_id .nomemberBuyBtn"
        ).style.display = "block";
        var setParameter = getParameter();
        sessionStorage.setItem("KG_returnUrl", setParameter.returnUrl);
      }
      //주문조회로그인
      if (paraname.indexOf("noMemberOrder") !== -1) {
        document.querySelector("#memberLogin .tabMenu").style.display = "block";
        injectOrderLoginForm();
      }
      //계정연동로그인
      if (paraname.indexOf("member_id") !== -1) {
        injectFooterInfo("회원가입", "pc_LogIn");

        var kakaoSyncLoginWrap = document.querySelector("#kakaoLogin");
        kakaoSyncLoginWrap.parentNode.removeChild(kakaoSyncLoginWrap);

        var snsLoginWrap = document.querySelector("#snsLogin");
        snsLoginWrap.parentNode.removeChild(snsLoginWrap);

        var mappingLoginInner = document.querySelector("#memberLogin");
        mappingLoginInner.insertAdjacentHTML(
          "afterbegin",
          domCollection.idLinkageTitleDOM
        );
        mappingLoginInner.querySelector("#normalLogin_id .text").style.display =
          "none";
        mappingLoginInner.querySelector(".utilMenu").innerHTML =
          '<a href="/member/passwd/find_passwd_info.html">비밀번호 찾기</a>';
      }
      break;
    case "/member/join.html":
      injectFooterInfo("회원가입", "pc_SignUp");
      keepgrowSync.querySelector("#KG_section").innerHTML =
        domCollection.kakaoJoinDOM + domCollection.memberJoinDOM;
      document
        .querySelector("#memberJoin .joinBtn")
        .addEventListener("click", function () {
          document.querySelector("#kgSync-plugin-wrap").style.display = "none";
          document.querySelector("#keepgrowLogin").style.display = "none";
          //모달창 none시 body 스크롤
          document.querySelector("body").setAttribute("style", "");
        });
      break;
    case "/member/mapping_login.html":
      injectFooterInfo("회원가입", "pc_Link");
      var mappingLoginDOM = document.querySelector("#mappingLogin");
      var presenceCheck = mappingLoginDOM.querySelector(".presenceCheck")
        .innerText;
      if (presenceCheck === "없습니다.") {
        console.log("keepgrow-kakaoSync-debug : " + "아이디 없음");
        mappingLoginDOM.querySelector(".btnNoKakao").click();
      }
      keepgrowSync.querySelector("#KG_section").append(mappingLoginDOM);
      break;
    case "/order/orderform.html":
      document.querySelector("#kgSync-plugin-wrap").style.display = "none";
      document.querySelector("#keepgrowLogin").style.display = "none"; //모달창 오픈시 body 스크롤 잠금
      document.querySelector("body").setAttribute("style", "");

      try {
        /*주문정보*/
        function removeCharacter(str) {
          var regExp = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;

          if (regExp.test(str)) {
            str = str.replace(regExp, "");
            return str;
          }
          return str;
        }

        var oname = document.querySelector("#oname");
        var rname = document.querySelector("#rname");

        /*주문자 정보*/
        if (oname) {
          var changeOname = removeCharacter(oname.value);
          oname.value = changeOname;
        }

        /*받는사람 정보*/
        if (rname) {
          //배송지 선택 클릭시
          document.querySelector("#sameaddr0").parentElement.id = "KG_address";

          var addrSelect = document.querySelector("#KG_address");
          var addrRadio = addrSelect.querySelectorAll("input[type=radio]");

          for (var i = 0; i < addrRadio.length; i++) {
            addrRadio[i].addEventListener("click", function () {
              setTimeout(function () {
                var changeRname = removeCharacter(rname.value);
                rname.value = changeRname;
              }, 500);
            });
          }

          //주소록보기 클릭시
          var newAdress = document.querySelector("#sameaddr1");
          var addrBtn = document.querySelector("#btn_shipp_addr");

          if (addrBtn) {
            addrBtn.addEventListener("click", function () {
              if (newAdress.checked !== true) {
                var interval = setInterval(function () {
                  if (newAdress.checked) {
                    clearInterval(interval);
                    var changeRname = removeCharacter(rname.value);
                    rname.value = changeRname;
                  }
                }, 1000);
              }
              if (newAdress.checked == true) {
                var orginRname = rname.value;
                var interval = setInterval(function () {
                  var newRname = rname.value;
                  if (orginRname !== newRname) {
                    clearInterval(interval);
                    var changeRname = removeCharacter(rname.value);
                    rname.value = changeRname;
                  }
                }, 1000);
              }
            });
          }

          //고객이 직접 입력시
          rname.addEventListener("change", function () {
            var changeRname = removeCharacter(rname.value);
            rname.value = changeRname;
          });

          const userInfoStorage = sessionStorage.getItem("member_1");
          const userInfo = userInfoStorage.data;
          if (rname.value || userInfo.name !== "") {
            var changeRname = removeCharacter(rname.value);
            rname.value = changeRname;
          }
        }
      } catch (e) {
        console.log("keepgrow-kakaoSync-debug : " + e);
      }
      break;
  }
  injectKakaoSync();
})();

//카카오 싱크 온시 아래 페이지 스크롤 방지
