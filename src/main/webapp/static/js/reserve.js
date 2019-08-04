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
		responseObj.executeProcess();
	}
};

let responseObj = {
	termRegExp: /전시기간: (.*)\n/,
	timeRegExp: /운영시간: (.*)\n/,
	// 응답 데이터를 저장하는 메소드
	getResponse: function(response) {
		this.displayInfo = response.displayInfo;
		this.productImages = response.productImages;
		this.displayInfoImage = response.displayInfoImage;
		this.comments = response.comments;
		this.averageScore = response.averageScore;
		this.productPrices = response.productPrices;
	},
	executeProcess: function() {
		this.setTitle();
		this.setMainImage();
		this.setDescription();
		this.setBookingTicket();
		this.setTicketEventListener();
	},
	setTitle: function() {
		let title = document.querySelector(".title");
		title.textContent = this.displayInfo.productDescription;
	},
	setMainImage: function() {
		let image = document.querySelector(".img_thumb");
		let title = document.querySelector(".preview_txt_tit");
		let price = document.querySelectorAll(".preview_txt_dsc").item(0);
		let lowestPrice = 0;
		for (let item of this.productImages) {
			if (item.saveFileName.includes("ma")) {
				image.src = "/" + item.saveFileName;
				break;
			}
		}
		title.textContent = this.displayInfo.productDescription;
		for (let item of this.productPrices) {
			if (lowestPrice === 0) lowestPrice = item.price
			if (lowestPrice > item.price) {
				lowestPrice = item.price;
			}
		}
		price.textContent = "₩ " + lowestPrice + " ~";
	},
	setDescription: function() {
		let title = document.querySelector(".in_tit");
		let place = document.querySelectorAll(".dsc")[0];
		title.textContent = this.displayInfo.productDescription;
		place.innerHTML = "장소 : " + this.displayInfo.placeLot + "<br>" + place.textContent;
	},
	setBookingTicket: function() {
		let priceTemplate = document.querySelector("#template-price-item").textContent;
		let target = document.querySelector(".ticket_body");
		let priceBindMethod = Handlebars.compile(priceTemplate);
		for (let item of this.productPrices) {
			switch(item.priceTypeName) {
				case 'A':
					item.priceTypeName = "성인";
					break;
				case 'Y':
					item.priceTypeName = "청소년";
					break;
				case 'B':
					item.priceTypeName = "유아";
					break;
				case 'S':
					item.priceTypeName = "성인";
					break;
				case 'D':
					item.priceTypeName = "장애인";
					break;
				case 'C':
					item.priceTypeName = "지역주민";
					break;
				case 'E':
					item.priceTypeName = "얼리버드";
					break;
			}
			item.price = Number(item.price).toLocaleString('en');
			let resultHTML = priceBindMethod(item);
			target.insertAdjacentHTML("beforeend", resultHTML);
		}
	},
	setTicketEventListener: function() {
		let controllers = document.querySelectorAll(".count_control");
		for (let controller of controllers) {
			controller.addEventListener("click", (e) => {
				if (e.target.tagName !== "A") return;
				e.preventDefault();
				let minusBtn = e.target.parentElement.firstElementChild;
				let plusBtn = e.target.parentElement.lastElementChild;
				let pricePerTicket = e.target.closest(".qty").querySelector(".qty_info_icon > .product_price > .price").textContent.replace(/,/g, "");
				let ticketCount = e.target.parentElement.querySelector(".count_control_input");
				let subPrice = e.target.closest(".count_control").querySelector(".individual_price > .total_price");
				let totalCount = document.querySelector("#totalCount");
				let totalPrice = document.querySelector("#totalPrice");
				if (e.target.classList.contains("ico_plus3")) {
					if (ticketCount.value === "0") {
						ticketCount.classList.remove("disabled");
						minusBtn.classList.remove("disabled");
					}
					ticketCount.value = Number.parseInt(ticketCount.value) + 1;
					totalCount.textContent = Number.parseInt(totalCount.textContent) + 1;
					totalPrice.textContent = Number.parseInt(totalPrice.textContent) + Number.parseInt(pricePerTicket);
				} else {
					if (ticketCount.value === "1") {
						ticketCount.classList.add("disabled");
						minusBtn.classList.add("disabled");
					}
					ticketCount.value = Number.parseInt(ticketCount.value) - 1;
					totalCount.textContent = Number.parseInt(totalCount.textContent) - 1;
					totalPrice.textContent = Number.parseInt(totalPrice.textContent) - Number.parseInt(pricePerTicket);
				}
				subPrice.textContent = Number.parseInt(ticketCount.value) * Number.parseInt(pricePerTicket);
			});
		}
	}
};

document.addEventListener("DOMContentLoaded", () => {
	requestObj.executeProcess();
});