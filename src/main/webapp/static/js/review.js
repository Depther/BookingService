// 요청 처리를 위한 객체
function RequestControl() {
	this.requestType = "GET";
	this.requestURI = "/api/products/";
	this.displayInfoId = 0;
}

// 요청에 대한 전체 프로세스를 진행하는 메소드
RequestControl.prototype.handleAllProcess = function() {
	this.getRequestParam();
	this.sendRequest();
};

// 요청 파라미터 가져오는 메소드
RequestControl.prototype.getRequestParam = function() {
	let params = window.location.search.substr(1).split("&");
	params.forEach(function(value) {
		let param = value.split("=");
		if (param[0] === "id") this.displayInfoId = param[1];
	}.bind(this));
};

// 요청을 실제 요청하는 메소드
RequestControl.prototype.sendRequest = function() {
	let apiRequest = new APIRequest(this.requestType, this.requestURI + this.displayInfoId, null, this.getResponse);
	apiRequest.sendRequest();
};

// 서버로부터 받은 응답을 처리하는 콜백 메소드
RequestControl.prototype.getResponse = function() {
	let response = JSON.parse(this.responseText);
	let responseControl = new ResponseControl(response);
	responseControl.handleAllProcess();
};

// Response 데이터 처리를 위한 객체
function ResponseControl(response) {
	this.response = response;
	this.displayInfo = response.displayInfo;
	this.productImages = response.productImages;
	this.displayInfoImage = response.displayInfoImage;
	this.comments = response.comments;
	this.averageScore = response.averageScore;
	this.productPrices = response.productPrices;
}

// 응답에 대한 전체 프로세스를 진행하는 메소드
ResponseControl.prototype.handleAllProcess = function() {
	this.setCommentsInfo();
	this.setCommentsList();
};

// 한줄평 관련 정보 세팅 메소드
ResponseControl.prototype.setCommentsInfo = function() {
	const perfectScore = 5;
	document.querySelector(".green").textContent = this.comments.length + "건";
	document.querySelector(".graph_value").style.width = ((this.averageScore / perfectScore) * 100) + "%";
	document.querySelector(".grade_area > .text_value > span").textContent = this.averageScore.toFixed(1);
};

// 예매자 한줄평 출력 메소드
ResponseControl.prototype.setCommentsList = function() {
	let commentHTML = document.querySelector("#template-comment").textContent;
	let commentBindMethod = Handlebars.compile(commentHTML);
	let commentTarget = document.querySelector(".list_short_review");
	let imageHTML = document.querySelector("#template-comment-image").textContent;
	let imageBindMethod = Handlebars.compile(imageHTML);

	this.comments.forEach(function(item) {
		let data = {
			"productDescription": this.displayInfo.productDescription,
			"comment": item.comment,
			"score": item.score.toFixed(1),
			"reservationEmail": item.reservationEmail,
			"reservationDate": item.reservationDate.split(" ")[0],
		};
		let commentResultHTML = commentBindMethod(data);
		commentTarget.insertAdjacentHTML("beforeend", commentResultHTML);

		if (item.commentImages.length > 0) {
			data = {"saveFileName": item.commentImages[0].saveFileName};
			let imageResultHTML = imageBindMethod(data);
			let imageTarget = document.querySelector(".list_short_review > .list_item:last-child .review_area");
			imageTarget.classList.remove("no_img");
			imageTarget.insertAdjacentHTML("afterbegin", imageResultHTML);
		}
	}.bind(this));
};

// 메인 함수
document.addEventListener("DOMContentLoaded", function() {
	let requestControl = new RequestControl();
	requestControl.handleAllProcess();
});