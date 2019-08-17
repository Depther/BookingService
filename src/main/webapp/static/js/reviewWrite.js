// 화면에 필요한 데이터 요청을 위한 객체
function DataRequest() {
	this.methodType = "GET";
	this.requestURI = "/api/products/";
	this.displayInfoId = 0;
}

// 모든 처리를 진행하는 메소드
DataRequest.prototype.executeProcess = function() {
	this.getAPIParam();
	this.callSendRequest();
};

// 쿼리스트링의 파라미터 값을 가져오는 메소드
DataRequest.prototype.getAPIParam = function() {
	const regExp = /displayInfoId=([0-9]+)&reservationInfoId=([0-9]+)&reservationEmail=(.+)/;
	this.displayInfoId = regExp.exec(window.location.search)[1];
	this.reservationInfoId = regExp.exec(window.location.search)[2];
	this.reservationEmail = regExp.exec(window.location.search)[3];
};

// 데이터 요청을 RequestSender 객체에 위임하는 메소드
DataRequest.prototype.callSendRequest = function() {
	const requestSender = new RequestSender(this, this.methodType, this.requestURI + this.displayInfoId, null, this.responseHandler);
	requestSender.sendRequest();
};

// 서버로부터 받은 응답을 처리하는 메소드
DataRequest.prototype.responseHandler = function(xhr, client) {
	const response = JSON.parse(xhr.responseText);
	new TopMenu(response, client.reservationEmail).executeProcess()
};

// 화면 상단바 관련 처리를 담당하는 객체
function TopMenu(response, reservationEmail) {
	this.response = response;
	this.reservationEmail = reservationEmail;
}

// 모든 처리를 진행하는 메소드
TopMenu.prototype.executeProcess = function() {
	this.setTitle();
	this.setBackBtn();
};

// 타이틀 설정 메소드
TopMenu.prototype.setTitle = function() {
	const title = document.querySelector(".title");
	title.textContent = this.response.displayInfo.productDescription;
};

// 뒤로가기 버튼 설정 메소드
TopMenu.prototype.setBackBtn = function() {
	const backBtn = document.querySelector(".btn_back");
	backBtn.setAttribute("href", "/myReservation?reservationEmail=" + this.reservationEmail);
};

// 별점 관련 처리를 위한 객체
function Rating() {}

// 모든 처리를 진행하는 메소드
Rating.prototype.executeProcess = function() {
	this.setStarBtnListener();
};

// 별 클릭 이벤트를 설정하는 메소드
Rating.prototype.setStarBtnListener = function() {
	const rating = document.querySelector(".rating");
	const point = document.querySelector(".star_rank");
	const stars = document.querySelectorAll(".rating_rdo");
	rating.addEventListener("click", (e) => {
		const idx = e.target.getAttribute("value") - 1;
		if (e.target.tagName == "INPUT") {
			point.textContent = e.target.getAttribute("value");
			point.classList.remove("gray_star");
			for (let i = 0, len = stars.length; i < len; i++) {
				if (i <= idx) {
					stars.item(i).checked = true;
				} else {
					stars.item(i).checked = false;
				}
			}
		}
	});
};

// 리뷰 작성과 관련된 처리를 위한 객체
function Review() {}

// 모든 처리를 진행하는 메소드
Review.prototype.executeProcess = function() {
	this.setReviewListener();
};

// textarea 관련 이벤트 설정 메소드
Review.prototype.setReviewListener = function() {
	const info = document.querySelector(".review_write_info");
	const textarea = document.querySelector(".review_textarea");
	const textCnt = document.querySelector(".guide_review").firstElementChild;
	const maxLen = 400;
	info.addEventListener("click", () => {
		info.style.display = "none";
		textarea.focus();
	});
	textarea.addEventListener("focusout", () => {
		if (textarea.value == "") {
			info.style.display = "block";
		}
	});
	textarea.addEventListener("keyup", () => {
		const length = textarea.value.length;
		if (length >= maxLen) {
			textarea.value = textarea.value.substring(0, maxLen);
		}
		textCnt.textContent = length;
	})
};

function ReviewRegister() {

}

ReviewRegister.prototype.executeProcess = function() {

};

ReviewRegister.prototype.setRegistBtnListener = function() {
	const registBtn = document.querySelector(".bk_btn");
	registBtn.addEventListener("click", () => {
		const requestSender = new RequestSender(this, "POST", "");
		requestSender.sendRequest();
	});

};


// 메인 함수
document.addEventListener("DOMContentLoaded", () => {
	new DataRequest().executeProcess();
	new Rating().executeProcess();
	new Review().executeProcess();
	// const submitBtn = document.querySelector(".bk_btn");
	// const file = document.querySelector("#reviewImageFileOpenInput");
	// submitBtn.addEventListener("click", (e) => {
	// 	e.preventDefault();
	// 	console.log("clicked");
	// 	const formData = new FormData();
	// 	formData.append("reviewImage", file.files[0]);
	// 	const xhr = new XMLHttpRequest();
	// 	xhr.addEventListener("load", () => {
	// 		console.log(JSON.parse(this.responseText));
	// 	});
	// 	xhr.open("POST", "/api/reservations/32/comments?comment=123&productId=321&score=4");
	// 	xhr.send(formData);
	// })

});