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
	let prevBtn = document.querySelector(".slide_prev");
	let nextBtn = document.querySelector(".slide_next");

	if (slideItems.length > 1) {
		slideItems = this.addDummy(slide, firstItem, lastItem);
		this.setSlideBtn(slideItems, prevBtn, nextBtn);
	} else {
		prevBtn.style.visibility = "hidden";
		nextBtn.style.visibility = "hidden";
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

Slide.prototype.setSlideBtn = function(slideItems, prevBtn, nextBtn) {
	let index = 1;
	let len = slideItems.length;
	prevBtn.addEventListener("click", function() {
		if (--index === 0) {
			index = len - 1;
			setTimeout(function() {
				slideItems.forEach(function(item) {
					item.style.transition = "0s";
					item.style.transform = "translateX(" + ((len - 2) * 100) + "%)";
				});
			}, 1000);
		}
		let xPos = slideItems.item(0).style.transform.match(/translateX\(([0-9\-]+)%\)/)[1];
		slideItems.forEach(function(item) {
			item.style.transition = "1s";
			item.style.transform = "translateX(" + (Number(xPos) + 100) + "%)";
		});
	});
	nextBtn.addEventListener("click", function() {
		if (++index === len - 1) {
			index = 1;
			setTimeout(function() {
				slideItems.forEach(function(item) {
					item.style.transition = "0s";
					item.style.transform = "translateX(-100%)";
				});
			}, 1000);
		}
		let xPos = slideItems.item(0).style.transform.match(/translateX\(([0-9\-]+)%\)/)[1];
		slideItems.forEach(function(item) {
			item.style.transition = "1s";
			item.style.transform = "translateX(" + (Number(xPos) - 100) + "%)";
		});
	});
};