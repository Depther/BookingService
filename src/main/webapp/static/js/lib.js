// API 요청 처리 객체
function APIRequest(requestType, requestUrl, params, handler) {
	this.requestType = requestType;
	this.requestUrl = requestUrl;
	this.params = params;
	this.handler = handler;
}

// 서버에 요청을 전송하고 응답을 받아오는 메소드
APIRequest.prototype.sendRequest = function() {
	let request = new XMLHttpRequest();
	request.addEventListener("load", this.handler);
	request.open(this.requestType, this.requestUrl);
	request.send(JSON.stringify(this.params));
};

/*
	슬라이드 애니메이션 처리 객체
	사용 방법
	1. Slide 아이템의 상위 태그에 slide 클래스 설정
	2. Slide 아이템에는 slide-item 클래스 설정
	3. 슬라이드 버튼에 slide_prev 또는 slide_next 클래스 설정
 */
function Slide() {
	this.imgMotionTime = 500;
	this.imgMovingSpace = 100;
	this.slide = document.querySelector(".slide");
	this.slideItems = document.querySelectorAll(".slide > .slide-item");
	this.firstItem = document.querySelector(".slide > .slide-item:first-child");
	this.lastItem = document.querySelector(".slide > .slide-item:last-child");
	this.prevBtn = document.querySelector(".slide_prev");
	this.nextBtn = document.querySelector(".slide_next");
	this.nowPageDisplay = document.querySelector(".num");
	this.totalPageDisplay = document.querySelector(".num.off > span");
	this.length = this.slideItems.length;
	this.itemCount = this.length;
	this.index = 1;
	this.xPos = -100;
}

// 슬라이드 애니메이션을 설정하는 메소드
Slide.prototype.executeProcess = function() {
	this.setPageDisplay();
	if (this.length <= 1) {
		this.prevBtn.style.visibility = "hidden";
		this.nextBtn.style.visibility = "hidden";
		return;
	}
	this.addDummyItems();
	this.setSlideBtn();
};

// 전체 이미지 수 및 현재 이미지 인덱스 표시 처리 메소드
Slide.prototype.setPageDisplay = function() {
	this.nowPageDisplay.textContent = this.index;
	this.totalPageDisplay.textContent = this.itemCount;
};

// 슬라이드 양 끝에 더미 아이템을 생성하는 메소드
Slide.prototype.addDummyItems = function() {
	this.slide.appendChild(this.firstItem.cloneNode(true));
	this.slide.insertBefore(this.lastItem.cloneNode(true), this.slide.childNodes[0]);
	this.slideItems = document.querySelectorAll(".slide > .slide-item");
	this.length = this.slideItems.length;
	this.slideItems.forEach(function(item) {
		item.style.transform = "translateX(" + this.xPos + "%)";
	}.bind(this));
};


// 슬라이드 버튼에 이벤트 추가하는 메소드
Slide.prototype.setSlideBtn = function() {
	this.prevBtn.addEventListener("click", function() {
		this.setSlideBtnInterval();
		this.xPos += this.imgMovingSpace;
		this.slideItems.forEach(function(item) {
			item.style.transition = this.imgMotionTime + "ms";
			item.style.transform = "translateX(" + this.xPos + "%)";
		}.bind(this));

		if (--this.index === 0) {
			this.controlEndOfSlide();
		}
		this.nowPageDisplay.textContent = this.index;
	}.bind(this));

	this.nextBtn.addEventListener("click", function() {
		this.setSlideBtnInterval();
		this.xPos -= this.imgMovingSpace;
		this.slideItems.forEach(function(item) {
			item.style.transition = this.imgMotionTime + "ms";
			item.style.transform = "translateX(" + this.xPos + "%)";
		}.bind(this));

		if (++this.index === this.length - 1) {
			this.controlEndOfSlide();
		}
		this.nowPageDisplay.textContent = this.index;
	}.bind(this));
};

// 연속적인 버튼 클릭을 방지하는 메소드
Slide.prototype.setSlideBtnInterval = function() {
	this.prevBtn.style.pointerEvents = "none";
	this.nextBtn.style.pointerEvents = "none";
	setTimeout(function() {
		this.prevBtn.style.pointerEvents = "auto";
		this.nextBtn.style.pointerEvents = "auto";
	}.bind(this), this.imgMotionTime);
};

// 슬라이드 끝에 도달 시 필요한 작업을 처리하는 메소드
Slide.prototype.controlEndOfSlide = function() {
	this.xPos = this.index === 0 ? this.itemCount * parseInt("-" + this.imgMovingSpace) : parseInt("-" + this.imgMovingSpace);
	this.index = this.index === 0 ? this.itemCount : 1;

	setTimeout(function() {
		this.slideItems.forEach(function(item) {
			item.style.transition = "0s";
			item.style.transform = "translateX(" + this.xPos + "%)";
		}.bind(this));
	}.bind(this), this.imgMotionTime);
};