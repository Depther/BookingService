/*
	Q. review 페이지에서 동작해야할 JavaScript가 detail 페이지 JavaScript의 부분집합이라서
	페이지별로 파일을 따로 나누지 않고 중간에 조건 분기를 통해서 처리하도록 하고 파일명은 detailAndReview.js
	라고 명명했습니다.
	이와 같이 로직이 중복되는 경우 어떻게 처리를 하는게 좋은가요?
	사실 파일 두 개 생길것을 하나로 합친다고 해서 크게 이점이 생기는 부분은 없는 것 같아서요.
	오히려 중간에 조건 분기 때문에 가독성만 떨어지는게 아닌가 싶기도 하네요.
 */

// 요청 전송 객체
let requestObj = {
	requestMethod:"GET",
	requestURI:"/api/products/",
	displayInfoId: 0,
	// 전체 프로세스 진행 메소드
	executeProcess: function() {
		this.getAPIParam();
		this.callSendRequest();
	},
	// URI에서 요청 파라미터 가져오는 메소드
	getAPIParam: function() {
		const regExp = /[a-zA-Z]+\/([0-9]+)/;
		const targetIdx = 1;
		this.displayInfoId = regExp.exec(window.location.pathname)[targetIdx];
	},
	// 요청을 전송하는 메소드를 호출하는 메소드
	callSendRequest: function() {
		let apiRequest = new APIRequest(this.requestMethod, this.requestURI + this.displayInfoId, null, this.responseHandler);
		apiRequest.sendRequest();
	},
	// 응답을 처리할 콜백
	responseHandler: function() {
		const pageName = window.location.pathname;
		responseObj.getResponse(JSON.parse(this.responseText));
		if (pageName.includes("detail")) responseObj.executeProcess();
		if (pageName.includes("review")) {
			responseObj.setCommentsInfo(true);
			responseObj.setCommentsList(true);
		}
	}
};

// 응답 처리 객체
let responseObj = {
	// 응답 데이터를 저장하는 메소드
	getResponse: function(response) {
		this.displayInfo = response.displayInfo;
		this.productImages = response.productImages;
		this.displayInfoImage = response.displayInfoImage;
		this.comments = response.comments;
		this.averageScore = response.averageScore;
		this.productPrices = response.productPrices;
	},
	// 전체 프로세스 진행 메소드
	executeProcess: function() {
		this.setMainImages();
		this.setProductContent();
		this.setReserveBtn();
		this.setCommentsInfo(false);
		this.setCommentsList(false);
		this.setInformationBtn();
		this.setDetailInfo();
	},
	// 상품 메인 이미지에 대한 처리를 하는 메소드
	setMainImages: function() {
		let mainImgTemplate = document.querySelector("#template-productImage-item").textContent;
		let mainImgBindMethod = Handlebars.compile(mainImgTemplate);
		let mainImgTarget = document.querySelector(".visual_img.detail_swipe");
		this.productImages.forEach(function(item) {
			let data = {
				"saveFileName": item.saveFileName,
				"productDescription": this.displayInfo.productDescription
			};
			let resultHTML = mainImgBindMethod(data);
			mainImgTarget.insertAdjacentHTML("beforeend", resultHTML);
		}.bind(this));
		// 메인 이미지 슬라이드 설정
		let slide = new Slide();
		slide.executeProcess();
	},
	// 상품 설명에 대한 처리를 하는 메소드
	setProductContent: function() {
		let productDesc = document.querySelector(".dsc");
		let descSection = document.querySelector(".section_store_details");
		let descOpenBtn = document.querySelector(".bk_more._open");
		let descCloseBtn = document.querySelector(".bk_more._close");
		let detailYn = document.querySelector(".store_details");
		productDesc.textContent = this.displayInfo.productContent;
		descSection.addEventListener("click", function(e) {
			e.preventDefault();
			let target = e.target;
			if (target.tagName !== "I" && target.tagName !== "SPAN" && target.tagName !== "A") return;
			if (target.tagName === "I") target = target.parentElement;
			if (target.tagName === "SPAN") target = target.parentElement;
			if (target.classList.contains("_open")) {
				detailYn.classList.remove("close3");
				descOpenBtn.style.display = "none";
				descCloseBtn.style.display = "block";
			} else {
				detailYn.classList.add("close3");
				descOpenBtn.style.display = "block";
				descCloseBtn.style.display = "none";
			}
		});
	},
	// 예약하기 버튼 설정 메소드
	setReserveBtn: function() {
		let reserveBtn = document.querySelector(".bk_btn");
		let displayInfoId = this.displayInfo.displayInfoId;
		reserveBtn.addEventListener("click", function() {
			window.location = "/reserve/" + displayInfoId;
		});
	},
	// Comment 관련 정보를 출력하는 메소드
	setCommentsInfo: function(reviewPageYn) {
		const perfectScore = 5;
		let commentsCnt = document.querySelector(".green");
		let starImage = document.querySelector(".graph_value");
		let avgScore =  document.querySelector(".grade_area > .text_value > span");
		commentsCnt.textContent = this.comments.length + "건";
		starImage.style.width = ((this.averageScore / perfectScore) * 100) + "%";
		avgScore.textContent = this.averageScore.toFixed(1);
		if (!reviewPageYn) {
			let moreCommentsBtn = document.querySelector(".btn_review_more");
			moreCommentsBtn.href = "/review/" + this.displayInfo.displayInfoId;
		}
	},
	// Comments 리스트를 출력하는 메소드
	setCommentsList: function(reviewPageYn) {
		let printCount = this.comments.length > 3 ? 3 : this.comments.length;
		if (reviewPageYn)
			printCount = this.comments.length;
		let commentTemplate= document.querySelector("#template-comment").textContent;
		let commentBindMethod = Handlebars.compile(commentTemplate);
		let commentTarget = document.querySelector(".list_short_review");
		let commentImgTemplate = document.querySelector("#template-comment-image").textContent;
		let commentImgBindMethod = Handlebars.compile(commentImgTemplate);
		let commentResultHTML;
		for (let i = 0; i < printCount; i++) {
			let item = this.comments[i];
			let data = {
				"productDescription": this.displayInfo.productDescription,
				"comment": item.comment,
				"score": item.score.toFixed(1),
				"reservationEmail": item.reservationEmail,
				"reservationDate": item.reservationDate.split(" ")[0],
			};
			commentResultHTML = commentBindMethod(data);
			commentTarget.insertAdjacentHTML("beforeend", commentResultHTML);
			if (item.commentImages.length > 0) {
				data = {"saveFileName": item.commentImages[0].saveFileName};
				let imageResultHTML = commentImgBindMethod(data);
				let imageTarget = document.querySelector(".list_short_review > .list_item:last-child .review_area");
				imageTarget.classList.remove("no_img");
				imageTarget.insertAdjacentHTML("afterbegin", imageResultHTML);
			}
		}
	},
	// 상세정보 버튼 이벤트 설정 메소드
	setInformationBtn: function() {
		let tabList = document.querySelector(".info_tab_lst");
		let detailInfoBtn = document.querySelector(".info_tab_lst > ._detail > .anchor");
		let pathBtn = document.querySelector(".info_tab_lst > ._path > .anchor");
		let detailInfo = document.querySelector(".detail_area_wrap");
		let location = document.querySelector(".detail_location");
		tabList.addEventListener("click", function(e) {
			e.preventDefault();
			let target = e.target;
			if (target.tagName !== "SPAN" && target.tagName !== "A") return;
			if (target.tagName === "SPAN") target = target.parentElement;
			if (target.tagName === "A") target = target.parentElement;
			if (target.classList.contains("_detail")) {
				detailInfoBtn.classList.add("active");
				pathBtn.classList.remove("active");
				detailInfo.classList.remove("hide");
				location.classList.add("hide");
			} else {
				detailInfoBtn.classList.remove("active");
				pathBtn.classList.add("active");
				detailInfo.classList.add("hide");
				location.classList.remove("hide");
			}
		});
	},
	// 행사장 정보를 출력하는 메소드
	setDetailInfo: function() {
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
	}
};

// 메인 함수
document.addEventListener("DOMContentLoaded", function() {
	requestObj.executeProcess();
});