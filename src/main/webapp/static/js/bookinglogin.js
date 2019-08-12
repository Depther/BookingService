// 이벤트 담당 클래스
function Event() {
	this.email = document.querySelector(".login_input");
	this.checkBtn = document.querySelector(".login_btn");
	this.EMAIL_REGEXP = /^[a-zA-Z0-9\.]{1,30}@[a-zA-Z]+\.(([a-zA-Z]+\.[a-zA-Z]+)|([a-zA-Z]+))$/;
}

// 이벤트 설정 메소드
Event.prototype.setEventListener = function() {
	this.email.addEventListener("keyup", (e) => {
		if (this.EMAIL_REGEXP.test(e.target.value)) {
			this.checkBtn.classList.remove("disable");
		} else {
			this.checkBtn.classList.add("disable");
		}
	});
	this.checkBtn.addEventListener("click", (e) => {
		e.preventDefault();
		window.location = "/myReservation?reservationEmail=" + encodeURIComponent(this.email.value);
	});
};

// 메인 함수
document.addEventListener("DOMContentLoaded", () => {
	new Event().setEventListener();
});