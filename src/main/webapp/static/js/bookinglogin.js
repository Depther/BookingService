let eventSettingObj = {
	// bookinglogin 페이지 이벤트 설정 메소드
	setEventListener: function() {
		const EMAIL_REGEXP = /^[a-zA-Z0-9\.]{1,30}@[a-zA-Z]+\.(([a-zA-Z]+\.[a-zA-Z]+)|([a-zA-Z]+))$/;
		const email = document.querySelector(".login_input");
		const checkBtn = document.querySelector(".login_btn");
		const form = document.getElementById("form1");
		email.addEventListener("keyup", (e) => {
			if (EMAIL_REGEXP.test(e.target.value)) {
				checkBtn.classList.remove("disable");
			} else {
				checkBtn.classList.add("disable");
			}
		});
		checkBtn.addEventListener("click", (e) => {
			e.preventDefault();
			window.location = "/myReservation?reservationEmail=" + encodeURIComponent(email.value);
		});
	}
};

// 메인 함수
document.addEventListener("DOMContentLoaded", () => {
	eventSettingObj.setEventListener();
});