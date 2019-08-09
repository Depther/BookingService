let eventObj = {
	setEventListener: function() {
		const EMAIL_REGEXP = /^[a-zA-Z0-9\.]{1,30}@[a-zA-Z]+\.(([a-zA-Z]+\.[a-zA-Z]+)|([a-zA-Z]+))$/;
		const email = document.querySelector(".login_input");
		const checkBtn = document.querySelector(".login_btn");
		email.addEventListener("focusout", (e) => {
			if (EMAIL_REGEXP.test(e.target.value)) {
				checkBtn.classList.remove("disable");
			} else {
				checkBtn.classList.add("disable");
			}
		});
		checkBtn.addEventListener("click", () => {
			requestObj.callSendRequest(this.email.value);
		});
	}
};

let requestObj = {
	requestMethod:"GET",
	requestURI:"/api/reservations?reservationEmail=",
	callSendRequest: function(emailText) {
		let apiRequest = new APIRequest(this.requestMethod, this.requestURI + emailText, null,  this.responseHandler);
	},
	responseHandler: function() {
		console.log(JSON.parse(this.responseText));
	}



};

// 메인 함수
document.addEventListener("DOMContentLoaded", () => {
	eventObj.setEventListener();
});