

// SCA_BASE 내부에 포함된 SCA_BASE.gs
// [추가] GitHub 정적 호스팅 전환본 (SCA_BASE.js) - 학교별 고유 설정 파일

//let G_schoolCode = "scahighschool";    // 학교코드
let G_schoolCode = "7d99fb8ea691dc4403cd2d7c9b7d576d3f327fcfc2abdc31697f7fe4304f793b";    // 학교코드

// [추가] 기존 LibBase_spa PropertiesService(SUPABASE_URL, SUPABASE_ANON_KEY)를 대체하는 클라우드 접속 설정
let G_supaUrl = "https://xvtwlgceerhjfclkmxsl.supabase.co"; // ⭐️ Supabase URL 입력
let G_supaAnonKey = "sb_publishable_4_ZzXxo6z9sn8skPcL26Hg_3bJrJOTO";                     // ⭐️ Supabase Anon Key 입력

let G_cloudUrl = "https://sca.scahs.kr";                             // 클라우드url (학교별 도메인)
let G_status = "가능";                                             // 사용 (가능,불가능) 여부
let G_dateF = new Date("2026/03/01");                            // 사용시작일
let G_dateT = new Date("2099/02/28");                            // 사용종료일
let G_nameKO = "순천청암고등학교";                                     // 기관명
let G_simbA = "temp";                                              // 기관심볼(마크+한글+영문)
let G_simbB = "1Y9nFP0KwRCH1BwGR3mHE1K3zQifk6UcM";               // 기관심볼(마크만)

let G_mainCode = "b82ba3de757ee2687ed29ddb69d6a60ec2f7c9d2e04e0b026b356c9a2fe911db";       // 메인메뉴
let G_logoutCode = "b9709a3b82b6c0538c1a6a2bdc1b8a716dae154805f3f21994173834953db14b";       // 로그아웃
let G_portalCode = "a4b82d79a7b6676b121d6b36f0c87dadb32426b6778d724081b05a2dc9bedc45";       // 클라우드포털
let G_copyright =  "© 2026. L.K.J All rights reserved.";

// [수정] FN_목적어_동사 명명규칙 적용 (기존 checkSystemStatus_base -> FN_system_check)
function FN_system_check() {
  let wk_result = true;
  let wk_msg = "✅ 사용 가능합니다.";

  // KST(한국 표준시) 기준 날짜 계산
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const kstOffset = 9 * 60 * 60 * 1000; 
  const kstDate = new Date(utc + kstOffset);

  const today = new Date(kstDate).setHours(0, 0, 0, 0);
  const systemStart = new Date(G_dateF).setHours(0, 0, 0, 0);
  const systemEnd = new Date(G_dateT).setHours(0, 0, 0, 0);

  if (G_status !== "가능") {
    wk_result = false;
    wk_msg = "⛔ 시스템 사용 불가 상태입니다."; 
  } else if (today < systemStart || today > systemEnd) {
    wk_result = false;
    wk_msg = "⛔ 시스템 사용 기간이 아닙니다.";     
  }

  const guestHashId = "23b0b5dc001221c5f3dfd68370f6f2648ee2081f9b009e51c86e0df39a3f2563";

  return { 
    result: wk_result, 
    msg: wk_msg, 
    schoolCode: G_schoolCode || "OOO", // [수정] 임시 학교코드 폴백 "OOO" 적용
    schoolName: G_nameKO,
    schoolMark1: G_simbA,
    schoolMark2: G_simbB, 
    copyRight: G_copyright,
    portalCode: G_portalCode,
    logoutCode: G_logoutCode,
    mainmenuCode: G_mainCode,
    cloudUrl: G_cloudUrl,
    // [추가] GitHub 직거래용 Supabase 설정 포함
    supaUrl: (G_supaUrl || "").replace(/\/$/, ""),
    supaAnonKey: G_supaAnonKey || "",
    sid: "",
    userHashId: "",
    guestHashId: guestHashId  
  };
}

// [추가] 하위 호환용 별칭 유지
//function checkSystemStatus_base() {
//  return FN_system_check();
//}

// [수정] FN_목적어_동사 명명규칙 적용 (기존 createErrorHtml -> FN_error_create)
// [추가] GitHub 브라우저 환경에서 HtmlService 대신 DOM을 직접 교체하여 에러 카드를 표출하도록 호환 처리
function FN_error_create(config) {
  const msg = String(config.msg || "오류가 발생했습니다.").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const schoolName = String(config.schoolName || 'OO학교').replace(/</g, "&lt;").replace(/>/g, "&gt;");

  document.title = schoolName + ' 클라우드';
  document.body.innerHTML = `
    <div style="font-family: 'Pretendard', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; width: 100vw; margin: 0; background: #f8fbf9;">
      <div style="background: white; padding: 40px; border-radius: 24px; box-shadow: 0 15px 35px rgba(0,0,0,0.08); text-align: center; max-width: 320px; border: 1px solid #eee;">
        <div style="font-size: 60px; margin-bottom: 20px;">🌿</div>
        <div style="color: #1b4332; font-size: 18px; font-weight: 800; margin-bottom: 12px;">접속 제한 안내</div>
        <div style="color: #c92a2a; font-size: 16px; font-weight: 500; line-height: 1.6; margin-bottom: 30px; word-break: keep-all; background: #fff5f5; padding: 10px; border-radius: 8px; border: 1px solid #ffe3e3;">${msg}</div>
        <div style="color: #666; font-size: 15px; line-height: 1.6; margin-bottom: 30px; word-break: keep-all;">안전한 서비스 이용을 위해<br>아래의 버튼을 눌러<br>현재 창을 닫아주시기 바랍니다.</div>
        <button id="closeBtn" onclick="handleErrorClose()" style="background: #38b000; color: white; padding: 14px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; display: inline-block; transition: 0.3s; border: none; cursor: pointer; width: 100%; font-size: 16px; box-sizing: border-box;">창 닫기</button>
      </div>
    </div>
  `;
  window.handleErrorClose = function() {
    const btn = document.getElementById('closeBtn');
    if (btn) { btn.disabled = true; btn.innerText = '닫는 중...'; }
    window.close();
    window.top.close();
    window.location.href = "https://www.google.com";
  };
}

// [추가] 하위 호환용 별칭 유지
//function createErrorHtml(config) {
//  return FN_error_create(config);
//}

// [추가] 기존 SCA_S_index.gs에서 SCA_BASE.FN_system_check()로 호출하던 네임스페이스 호환 객체
window.SCA_BASE = {
  FN_system_check: FN_system_check,
  FN_error_create: FN_error_create
};


