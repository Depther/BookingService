let requestObj = {
	requestMethod:"GET",
	requestURI:"/api/reservations?",
	reservationEmailParam: "",
	// 전체 프로세스 진행 메소드
	executeProcess: function() {
		this.getAPIParam();
		this.callSendRequest();
	},
	// URI에서 요청 파라미터 가져오는 메소드
	getAPIParam: function() {
		const paramRegExp = /reservationEmail=.+/;
		const queryString = window.location.search;
		this.reservationEmailParam = decodeURIComponent(paramRegExp.exec(queryString));
		const reservationEmail = this.reservationEmailParam.substring(this.reservationEmailParam.indexOf("=") + 1);
		viewObj.setEmailInfo(reservationEmail);
	},
	// 요청을 전송하는 메소드를 호출하는 메소드
	callSendRequest: function() {
		let apiRequest = new APIRequest(this.requestMethod, this.requestURI + this.reservationEmailParam, null, this.responseHandler);
		apiRequest.sendRequest();
	},
	// 응답을 처리할 콜백
	responseHandler: function() {
		console.log(JSON.parse(this.responseText));
	}
};

let viewObj = {
	setEmailInfo: function(email) {
		const emailElement = document.querySelector(".viewReservation");
		emailElement.textContent = email;
	},
	executeProcess: function() {
		this.getDOMElement();
		this.setCancelBtnEvent();
	},
	getDOMElement: function() {
		const topFigure = document.querySelectorAll(".link_summary_board > .figure");
		this.totalcount = topFigure.item(0);
		this.confirmedCount = topFigure.item(1);
		this.usedCount = topFigure.item(2);
		this.canceledCount = topFigure.item(3);
		this.confirmedList = document.querySelector(".card.confirmed");
		this.usedList = document.querySelector(".card.used");
		this.canceledList = document.querySelector(".card.cancel");
		this.confirmedTemplate = document.getElementById("confirmed-reservation-template").textContent;
		this.usedTemplate = document.getElementById("used-reservation-template").textContent;
		this.canceledTemplate = document.getElementById("canceled-reservation-template").textContent;
	},
	/*
		P. Cancel API 전송하도록 처리해야함
	 */
	setCancelBtnEvent: function() {
		this.confirmedList.addEventListener("click", (e) => {
			if (e.target.tagName === "BUTTON" ||
				(e.target.tagName === "SPAN" && e.target.parentElement.tagName === "BUTTON")) {
				if (confirm("취소하시겠습니까?")) {
					this.confirmedCount.textContent = parseInt(this.confirmedCount.textContent) - 1;
					this.canceledCount.textContent = parseInt(this.canceledCount.textContent) + 1;
					e.target.closest(".card_item").remove();
					this.canceledList.insertAdjacentHTML("beforeend", this.canceledTemplate);
				}
			}
		});
	}
};

// 메인 함수
document.addEventListener("DOMContentLoaded", () => {
	requestObj.executeProcess();
	viewObj.executeProcess();
});