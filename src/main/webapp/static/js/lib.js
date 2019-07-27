// API 요청 처리 객체
function APIRequest(requestType, requestUrl, params, handler) {
	this.requestType = requestType;
	this.requestUrl = requestUrl;
	this.params = params;
	this.handler = handler;
}

APIRequest.prototype.sendRequest = function() {
	let xhr = new XMLHttpRequest();
	console.log(`Method: ${this.requestType}, URL: ${this.requestUrl} Params: ${this.params}`);
	xhr.addEventListener("load", this.handler);
	xhr.open(this.requestType, this.requestUrl);
	xhr.send(this.params);
};

// 슬라이드 애니메이션 처리 객체
function Slide() {}

Slide.prototype.setSlideEffect = function() {
	let slide = document.querySelector(".slide");
	let slideItems = document.querySelectorAll(".slide > .slide-item");
	let firstItem = document.querySelector(".slide > .slide-item:first-child");
	let lastItem = document.querySelector(".slide > .slide-item:last-child");

	if (slideItems.length > 1) {
		slideItems = this.addDummy(slide, firstItem, lastItem);
	}
};

Slide.prototype.addDummy = function(slide, firstItem, lastItem) {
	slide.appendChild(firstItem.cloneNode(true));
	slide.insertBefore(lastItem.cloneNode(true), slide.childNodes[0]);
	let slideItems = document.querySelectorAll(".slide > .slide-item");
	slideItems.forEach(function(item) {
		item.style.transform = "translateX(-100%)";
	});
	return slideItems;
};