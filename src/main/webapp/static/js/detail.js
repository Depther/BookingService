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
	// ResponseControl 객체에 응답에 대한 처리를 요청
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
	this.setMainImages();
	this.setProductContent();
	this.setCommentsInfo();
	this.setCommentsList();
	this.setInformationBtn();
	this.setDetailInfo();
};

// 메인 이미지 처리 메소드
ResponseControl.prototype.setMainImages = function() {
	this.productImages.forEach(function(item) {
		let html = document.querySelector("#template-productImage-item").textContent;
		let bindMethod = Handlebars.compile(html);
		let target = document.querySelector(".visual_img.detail_swipe");
		let data = {
			"saveFileName": item.saveFileName,
			"productDescription": this.displayInfo.productDescription
		};
		let resultHTML = bindMethod(data);
		target.insertAdjacentHTML("beforeend", resultHTML);
	}.bind(this));
	// 메인 이미지 슬라이드 설정
	let slide = new Slide();
	slide.handleAllProcess();
};

// 상품 상세내용 처리 메소드
ResponseControl.prototype.setProductContent = function() {
	document.querySelector(".dsc").textContent = this.displayInfo.productContent;
	let openBtn = document.querySelector(".bk_more._open");
	let closeBtn = document.querySelector(".bk_more._close");
	let detail = document.querySelector(".store_details");
	openBtn.addEventListener("click", function(e) {
		e.preventDefault();
		detail.classList.remove("close3");
		openBtn.style.display = "none";
		closeBtn.style.display = "block";
	});
	closeBtn.addEventListener("click", function(e) {
		e.preventDefault();
		detail.classList.add("close3");
		openBtn.style.display = "block";
		closeBtn.style.display = "none";
	});
};

// 한줄평 관련 정보 세팅 메소드
ResponseControl.prototype.setCommentsInfo = function() {
	const perfectScore = 5;
	document.querySelector(".green").textContent = this.comments.length + "건";
	document.querySelector(".graph_value").style.width = ((this.averageScore / perfectScore) * 100) + "%";
	document.querySelector(".grade_area > .text_value > span").textContent = this.averageScore.toFixed(1);
	document.querySelector(".btn_review_more").href = "/review?id=" + this.displayInfo.displayInfoId;
};

// 예매자 한줄평 출력 메소드
ResponseControl.prototype.setCommentsList = function() {
	const printCount = this.comments.length > 3 ? 3 : this.comments.length;
	let commentHTML = document.querySelector("#template-comment").textContent;
	let commentBindMethod = Handlebars.compile(commentHTML);
	let commentTarget = document.querySelector(".list_short_review");
	let imageHTML = document.querySelector("#template-comment-image").textContent;
	let imageBindMethod = Handlebars.compile(imageHTML);

	for (let i = 0; i < printCount; i++) {
		let item = this.comments[i];
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
	}
};

// 상세정보, 오시는 길 버튼 이벤트 설정 메소드
ResponseControl.prototype.setInformationBtn = function() {
	let detailInfoBtn = document.querySelector(".info_tab_lst > ._detail > .anchor");
	let pathBtn = document.querySelector(".info_tab_lst > ._path > .anchor");
	let detailInfo = document.querySelector(".detail_area_wrap");
	let location = document.querySelector(".detail_location");

	detailInfoBtn.addEventListener("click", function(e) {
		e.preventDefault();
		detailInfoBtn.classList.add("active");
		pathBtn.classList.remove("active");
		detailInfo.classList.remove("hide");
		location.classList.add("hide");
	});
	pathBtn.addEventListener("click", function(e) {
		e.preventDefault();
		detailInfoBtn.classList.remove("active");
		pathBtn.classList.add("active");
		detailInfo.classList.add("hide");
		location.classList.remove("hide");
	});
};

// 상세정보 및 오시는길 정보 출력 메소드
ResponseControl.prototype.setDetailInfo = function() {
	let intro = document.querySelector(".detail_info_group > .detail_info_lst > .in_dsc");
	let storeName = document.querySelector(".store_name");
	let addrBold = document.querySelector(".store_addr_bold");
	let addrOld = document.querySelector(".addr_old_detail");
	let place = document.querySelector(".addr_detail");
	let tel = document.querySelector(".store_tel");
	intro.textContent = this.displayInfo.productContent;
	storeName.textContent = this.displayInfo.productDescription;
	addrBold.textContent = this.displayInfo.placeStreet;
	addrOld.textContent = this.displayInfo.placeLot;
	place.textContent = this.displayInfo.placeName;
	tel.textContent = this.displayInfo.telephone;
};

// 메인 함수
document.addEventListener("DOMContentLoaded", function() {
	let requestControl = new RequestControl();
	requestControl.handleAllProcess();
	document.querySelector(".bk_btn").addEventListener("click", function() {
		window.location = "/reserve";
	});
});