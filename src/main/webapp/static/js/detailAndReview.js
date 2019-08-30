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
		const requestSender = new RequestSender(this, this.requestMethod, this.requestURI + this.displayInfoId, null, this.responseHandler);
		requestSender.sendRequest();
	},
	// 응답을 처리할 콜백
	responseHandler: function(xhr, client) {
		const pageName = window.location.pathname;
		responseObj.getResponse(JSON.parse(xhr.responseText));
		if (pageName.includes("detail")) responseObj.executeDetailProcess();
		if (pageName.includes("review")) responseObj.executeReviewProcess();
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
	// Detail 페이지 전체 프로세스 진행 메소드
	executeDetailProcess: function() {
		this.setMainImages();
		this.setProductContent();
		this.setReserveBtn();
		this.setCommentsInfo(false);
		this.setCommentsList(false);
		this.setCommentImageDownloader();
		this.setInformationBtn();
		this.setDetailInfo();
	},
	// Review 페이지 전체 프로세스 진행 메소드
	executeReviewProcess: function() {
		this.setTitle();
		this.setCommentsInfo(true);
		this.setCommentsList(true);
		this.setBackBtn();
		this.setCommentImageDownloader();
	},
	// 상품 메인 이미지에 대한 처리를 하는 메소드
	setMainImages: function() {
		let mainImgTemplate = document.querySelector("#template-productImage-item").textContent;
		let mainImgBindMethod = Handlebars.compile(mainImgTemplate);
		let mainImgTarget = document.querySelector(".visual_img.detail_swipe");
		this.productImages.forEach(function(item) {
			let data = {
				"fileId": item.fileInfoId,
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
				data = {"imageId": item.commentImages[0].imageId};
				let imageResultHTML = commentImgBindMethod(data);
				let imageTarget = document.querySelector(".list_short_review > .list_item:last-child .review_area");
				imageTarget.classList.remove("no_img");
				imageTarget.insertAdjacentHTML("afterbegin", imageResultHTML);
			}
		}
	},
	// 이미지 클릭 시 다운로드 설정 메소드
	setCommentImageDownloader: function() {
		const reviewBox = document.querySelector(".review_box");
		reviewBox.addEventListener("click", (e) => {
			if (e.target.getAttribute("class") === "thumb") {
				console.log("2222");
				const requestURI = e.target.firstElementChild.getAttribute("src");
				window.location.pathname = requestURI;
			}
		});
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
	},
	setTitle: function() {
		let title = document.querySelector(".title");
		title.textContent = this.displayInfo.productDescription;
	},
	// Review 페이지 뒤로 가기 버튼 설정 메소드
	setBackBtn: function() {
		let backBtn = document.querySelector(".btn_back");
		backBtn.href = "/detail/" + this.displayInfo.displayInfoId;
	},
};

// 메인 함수
document.addEventListener("DOMContentLoaded", function() {
	requestObj.executeProcess();
});