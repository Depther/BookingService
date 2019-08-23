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
	const displayIdRegExp = /displayInfoId=([0-9]+)/;
	const reservationIdRegExp = /reservationInfoId=([0-9]+)/;
	const reservationEmailRegExp = /reservationEmail=([^&]+)/;
	this.displayInfoId = displayIdRegExp.exec(window.location.search)[1];
	this.reservationInfoId = reservationIdRegExp.exec(window.location.search)[1];
	this.reservationEmail = reservationEmailRegExp.exec(window.location.search)[1];
};

// 데이터 요청을 RequestSender 객체에 위임하는 메소드
DataRequest.prototype.callSendRequest = function() {
	const requestSender = new RequestSender(this, this.methodType, this.requestURI + this.displayInfoId, null, this.responseHandler);
	requestSender.sendRequest();
};

// 서버로부터 받은 응답을 처리하는 메소드
DataRequest.prototype.responseHandler = function(xhr, client) {
	const response = JSON.parse(xhr.responseText);
	new TopMenu(response, client.reservationEmail).executeProcess();
	new ReviewRegister(response, client.reservationInfoId, client.reservationEmail).executeProcess();
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
	const score = document.querySelector(".star_rank");
	const stars = document.querySelectorAll(".rating_rdo");
	rating.addEventListener("click", (e) => {
		if (e.target.tagName == "INPUT") {
			score.textContent = e.target.getAttribute("value");
			score.classList.remove("gray_star");
			const idx = e.target.getAttribute("value") - 1;
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
	this.setReviewWriteListener();
	this.setFileSelectListener();
	this.removeFileListener();
};

// textarea 관련 이벤트 설정 메소드
Review.prototype.setReviewWriteListener = function() {
	const info = document.querySelector(".review_write_info");
	const textarea = document.querySelector(".review_textarea");
	const textCnt = document.querySelector(".guide_review").firstElementChild;
	const maxLen = 400;
	info.addEventListener("click", () => {
		info.style.display = "none";
		textarea.focus();
	});
	textarea.addEventListener("focusout", () => {
		if (textarea.value == "")
			info.style.display = "block";
	});
	textarea.addEventListener("keyup", () => {
		const length = textarea.value.length;
		if (length >= maxLen) {
			textarea.value = textarea.value.substring(0, maxLen);
		}
		textCnt.textContent = length;
	})
};

// File 추가 이벤트 시 발생할 이벤트 리스너 등록 메소드
Review.prototype.setFileSelectListener = function() {
	const fileElement = document.querySelector("#reviewImageFileOpenInput");
	const thumbnail = document.querySelector(".item_thumb");
	const item = thumbnail.closest(".item");
	fileElement.addEventListener("change", (e) => {
		let file = fileElement.files[0];
		if (file.type.includes("jpeg") || file.type.includes("png")) {
			item.style.display = "block";
			thumbnail.src = window.URL.createObjectURL(fileElement.files[0]);
		} else {
			file = null;
		}
	});
};

// 파일 제거 버튼 클릭 이벤트 시 발생할 이벤트 리스너 등록 메소드
Review.prototype.removeFileListener = function() {
	const removeBtn = document.querySelector(".ico_del");
	const file = document.querySelector("#reviewImageFileOpenInput");
	const thumbnail = document.querySelector(".item_thumb");
	const item = thumbnail.closest(".item");
	removeBtn.addEventListener("click", () => {
		file.files[0] = null;
		item.style.display = "none";
		thumbnail.src=""
	});
};

// 리뷰 등록 버튼과 관련된 처리를 담당하는 클래스
function ReviewRegister(response, reservationInfoId, reservationEmail) {
	this.response = response;
	this.reservationInfoId = reservationInfoId;
	this.reservationEmail = reservationEmail;
}

// 모든 처리를 진행하는 메소드
ReviewRegister.prototype.executeProcess = function() {
	this.setRegistBtnListener();
};

// 리뷰 등록 버튼 클릭 이벤트 시 발생할 이벤트 리스너 등록 메소드
ReviewRegister.prototype.setRegistBtnListener = function() {
	const registBtn = document.querySelector(".bk_btn");
	registBtn.addEventListener("click", () => {
		const point = document.querySelector(".star_rank").textContent;
		const comment = document.querySelector(".review_textarea").value;
		const productId = this.response.displayInfo.productId;
		const requestURI = "/api/reservations/" + this.reservationInfoId + "/comments?comment=" + comment + "&productId=" + productId + "&score=" + point;
		const fileElement = document.querySelector("#reviewImageFileOpenInput");
		const formData = new FormData();
		formData.append("reviewImage", fileElement.files[0]);
		if (point !== "0" && comment.length >= 5 && comment.length <= 400) {
			const requestSender = new RequestSender(this, "post", requestURI, formData, this.responseHandler);
			requestSender.sendRequest();
		} else {
			alert("별점과 리뷰가 적절하지 않습니다.");
		}
	});
};

// 리뷰 등록 완료 후 예약 내역 페이지로 이동시키는 메소드
ReviewRegister.prototype.responseHandler = function(xhr, client) {
	const response = JSON.parse(xhr.responseText);
	if (response.status) {
		alert(response.message);
		return;
	}
	window.location.href = "/myReservation?reservationEmail=" + client.reservationEmail;
};

// 메인 함수
document.addEventListener("DOMContentLoaded", () => {
	new DataRequest().executeProcess();
	new Rating().executeProcess();
	new Review().executeProcess();
});