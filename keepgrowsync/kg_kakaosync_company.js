try{
	//브라우저 체크(IE)
	var browserIeCheck = (function(){
		var browserEnv = window.navigator.userAgent;
		var msie = browserEnv.indexOf("MSIE ");
		if(msie > 0){
			var ieVerCheck = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (ieVerCheck.exec(browserEnv) != null){
				ieVer = parseFloat(RegExp.$1);
			}
			if(ieVer < 9){
				throw "keepgrow-kakaoSync-debug : " + "IE8버전 이하는 지원하지 않습니다."
			}
		}
	})();
	
	var KG_userInfo = {
		shopName : "업체명",
		accessKey : "f7f2399479156c5c8ce2882e8cfd9ee8"
	}
	
	var kg_syncStart = function(page){
		if(page){
			window.kgSync = function(args, utm){
				kgSync.queue.push(args, utm);
			};
			window.kgSync.queue = [];
			
			//cover background
			var coverBackgroundForPlugin = (function(){
				var kg_syncPluginWrap = document.createElement("div");
				kg_syncPluginWrap.id = "kgSync-plugin-wrap";
				kg_syncPluginWrap.setAttribute(
					"style",
					"background:#fff; position:fixed; top:0; right:0; left: 0; bottom: 0; z-index:888;"
				);
				document.body.appendChild(kg_syncPluginWrap);
			})();
			
			//load Script for Plugin
			var loadScriptForPlugin = function(){
				if (window.kg_syncInitialized) {
					return;
				}
				window.kg_syncInitialized = true;
				
				//import script
				var kg_importJS = document.createElement("script");
				kg_importJS.id = "kgSync-script";
				kg_importJS.type = "text/javascript";
				kg_importJS.async = true;
				kg_importJS.charset = "UTF-8";
				userEnv === "mobile"
					? kg_importJS.src = "//storage.keepgrow.com/admin/kakaosync/init/kg_kakaosyncInit_mobile.js"
					: kg_importJS.src = "//storage.keepgrow.com/admin/kakaosync/init/kg_kakaosyncInit_pc.js"
					
				var x = document.getElementsByTagName("script")[0];
				x.parentNode.insertBefore(kg_importJS, x);
				
				//import css
				var kg_importCSS = document.createElement("link");
				kg_importCSS.rel = "stylesheet";
				kg_importCSS.type = "text/css";
				userEnv === "mobile"
					? kg_importCSS.href = "//storage.keepgrow.com/admin/kakaosync/css/kg_kakaosyncStyle_mobile.css"
					: kg_importCSS.href = "//storage.keepgrow.com/admin/kakaosync/css/kg_kakaosyncStyle_pc.css"
				
				var y = document.getElementsByTagName("link")[0];
				y.parentNode.insertBefore(kg_importCSS, y);
			};
			
			// javscript load fail & cover delete
			var catchLoadScriptError = function(){
				var Script = document.getElementById("kgSync-script");
				var coverBackgroundForPlugin = document.getElementById(
				  "kgSync-plugin-wrap"
				);
				Script.onerror = function(){
				  document.body.removeChild(coverBackgroundForPlugin);
				};
			};
			kgSync("init", { domain: "chan01.co.kr" });
			
			// 실제 실행문
			var option = {};
			var KG_syncQueue = function(option){
				if(option === "init"){
					//load Script for Plugin
					window.attachEvent
						? window.attachEvent("onload", loadScriptForPlugin)
						: window.addEventListener("load", loadScriptForPlugin, false);
						
					// javscript load fail & cover delete
					window.attachEvent
						? window.attachEvent("onload", catchLoadScriptError)
						: window.addEventListener("load", catchLoadScriptError, false);
				}
			};
			window.kgSync.queue.forEach(function(queue){
				KG_syncQueue(queue);
			});
		}
	};

	//사용자 환경 체크
	var userEnv = document.getElementById("kgSync-init").getAttribute("data-env");	
	var kg_syncStartByUserEnv = (function(userEnv){
		var loginPage = window.location.pathname === "/member/login.html",
			mappingPage = window.location.pathname === "/member/mapping_login.html",
			joinPage = window.location.pathname === "/member/join.html",
			orderPage = window.location.pathname === "/order/orderform.html";
		if(userEnv === "mobile"){
			joinPage = window.location.pathname === "/member/agreement.html"
		};
		kg_syncStart(loginPage || mappingPage || joinPage || orderPage);
	})(userEnv);
	
	/*===== 카페24 모듈 스크립트 :: !!삭제하면 안돼요!! =====*/
	var MemberAction = {};
	function setKakaoSdkInit(clientSecret) {
		if (Kakao.isInitialized()) {
			Kakao.cleanup();
		}
		Kakao.init(clientSecret);
	}
	// 카카오싱크 로그인
	MemberAction.kakaosyncLogin = function (clientSecret) {
		setKakaoSdkInit(clientSecret);
		Kakao.Auth.authorize({
			redirectUri: location.origin + "/Api/Member/Oauth2ClientCallback/kakao/",
		});
	};
	/*===== 카페24 모듈 스크립트 :: !!삭제하면 안돼요!! =====*/
	
	
} catch(e) {
  console.log("keepgrow-kakaoSync-debug : " + e);
}

//console.log("%cKEEPGROW KAKAOSYNC / COPYRIGHT ⓒUNEEDCOMMS ALL RIGHTS RESERVED.","font-size:12px;font-weight:bold;color:#5e81f4;")
