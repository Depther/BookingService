// 요청 처리를 위한 객체
function RequestControl() {}

// 요청 파라미터 가져오는 함수
RequestControl.prototype.getRequestParam = function() {
	let params = window.location.search.substr(1).split("&");
	let displayInfoId;
	params.forEach(function(value) {
		let param = value.split("=");
		if (param[0] === "id") displayInfoId = param[1];
	});
	return displayInfoId;
};

// Detail Data 조회
RequestControl.prototype.requestDetailAPI = function() {
	let response = JSON.parse(this.responseText);
	let dataControl = new DataControl();
	dataControl.controlMainImages(response.productImages, response.displayInfo.productDescription);
	dataControl.controlProductContent(response.displayInfo.productContent);
};

// Response 데이터 처리를 위한 객체
function DataControl() {}

// 메인 이미지 처리 메소드
DataControl.prototype.controlMainImages = function(productImages, productDescription) {
	let count = productImages.length;
	document.querySelector(".num.off > span").textContent = count;
	productImages.forEach(function(item) {
		let html = document.querySelector("#template-productImage-item").textContent;
		let bindMethod = Handlebars.compile(html);
		let target = document.querySelector(".visual_img.detail_swipe");
		let data = {
			"saveFileName": item.saveFileName,
			"productDescription": productDescription
		};
		let resultHTML = bindMethod(data);
		target.insertAdjacentHTML("beforeend", resultHTML);
	});
	let slide = new Slide();
	slide.setSlideEffect();
};

// 상품 설명 처리 메소드
DataControl.prototype.controlProductContent = function(productContent) {
	document.querySelector(".dsc").textContent = productContent;
	let openBtn = document.querySelector(".bk_more._open");
	let closeBtn = document.querySelector(".bk_more._close");
	let detail = document.querySelector(".store_details");
	openBtn.addEventListener("click", function() {
		detail.classList.remove("close3");
		openBtn.style.display = "none";
		closeBtn.style.display = "block";
	});
	closeBtn.addEventListener("click", function() {
		detail.classList.add("close3");
		openBtn.style.display = "block";
		closeBtn.style.display = "none";
	});
};

document.addEventListener("DOMContentLoaded", function() {
	let requestControl = new RequestControl();
	let displayInfoId = requestControl.getRequestParam();
	let apiRequest = new APIRequest("GET", "http://localhost:8080/api/products/" + displayInfoId, null, requestControl.requestDetailAPI);
	apiRequest.sendRequest();
});