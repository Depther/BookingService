// 요청 전송 객체
let requestObj = {
	requestMethod:"GET",
	requestURI:"/api/products/",
	dateURI:"/api/date",
	displayInfoId: 0,
	// 전체 프로세스 진행 메소드
	executeProcess: function() {
		this.getAPIParam();
		this.callSendRequest();
		this.callDateAPI();
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
	// 공연 날짜 API를 요청하는 메소드
	callDateAPI: function() {
		let apiRequest = new APIRequest(this.requestMethod, this.dateURI, null, this.dateHandler);
		apiRequest.sendRequest();
	},
	// 상품 정보 응답을 처리할 콜백 함수
	responseHandler: function() {
		const pageName = window.location.pathname;
		responseObj.getResponse(JSON.parse(this.responseText));
		responseObj.executeProcess();
	},
	// 공연 날짜 응답을 처리할 콜백 함수
	dateHandler: function() {
		let response = JSON.parse(this.responseText);
		let showDate = document.querySelector("#showDate");
		showDate.textContent = `${response.year}.${response.monthValue}.${response.dayOfMonth}`;
	}
};

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
		this.setBackBtn();
		this.setTitle();
		this.setMainImage();
		this.setDescription();
		this.setBookingTicket();
		this.setTicketEventListener();
		this.setInputChecker();
		this.setClauseEventListener();
		this.setConditionChecker();
		this.setBookingEventListener();
	},
	// 뒤로가기 버튼 설정 메소드
	setBackBtn: function() {
		let backBtn = document.querySelector(".btn_back");
		backBtn.href = "/detail/" + this.displayInfo.displayInfoId;
	},
	// 예약하기 페이지 상단 타이틀 출력 메소드
	setTitle: function() {
		let title = document.querySelector(".title");
		title.textContent = this.displayInfo.productDescription;
	},
	// 예약하기 페이지 이미지 출력 메소드
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
	// 상품 설명 부분 출력 메소드
	setDescription: function() {
		let title = document.querySelector(".in_tit");
		let place = document.querySelectorAll(".dsc")[0];
		title.textContent = this.displayInfo.productDescription;
		place.innerHTML = "장소 : " + this.displayInfo.placeLot + "<br>" + place.textContent;
	},
	// 티켓 선택 부분 출력 메소드
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
	// 티켓 선택 부분 이벤트 설정 메소드
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
					ticketCount.setAttribute("value", Number.parseInt(ticketCount.value) + 1);
					totalCount.textContent = Number.parseInt(totalCount.textContent) + 1;
					totalPrice.textContent = Number.parseInt(totalPrice.textContent) + Number.parseInt(pricePerTicket);
				} else {
					if (ticketCount.value === "1") {
						ticketCount.classList.add("disabled");
						minusBtn.classList.add("disabled");
					}
					ticketCount.setAttribute("value", Number.parseInt(ticketCount.value) - 1);
					totalCount.textContent = Number.parseInt(totalCount.textContent) - 1;
					totalPrice.textContent = Number.parseInt(totalPrice.textContent) - Number.parseInt(pricePerTicket);
				}
				subPrice.textContent = Number.parseInt(ticketCount.value) * Number.parseInt(pricePerTicket);
			});
		}
	},
	// 사용자 입력값 검증 이벤트 설정 메소드
	setInputChecker: function() {
		const NAME_REGEXP = /[a-zA-Z0-9]|[ \[\]{}()<>?|`~!@#$%^&*\-_+=,.;:\"'\\]/g;
		const TEL_REGEXP = /^\d{3}-\d{3,4}-\d{4}$/;
		const NO_DASH_TEL_REGEXP = /^\d{3}\d{3,4}\d{4}$/;
		const EMAIL_REGEXP = /^[a-zA-Z0-9\.]{1,30}@[a-zA-Z]+\.(([a-zA-Z]+\.[a-zA-Z]+)|([a-zA-Z]+))$/;
		let name = document.querySelector("#name");
		let tel = document.querySelector("#tel");
		let email = document.querySelector("#email");
		let warning = document.querySelectorAll(".warning_msg");
		name.addEventListener("focusout", (e) => {
			if (name.value.search(NAME_REGEXP) !== -1) {
				name.nextElementSibling.classList.add("active");
			}
		});
		tel.addEventListener("focusout", () => {
			if (NO_DASH_TEL_REGEXP.test(tel.value)) {
				if (tel.value.length == 10) {
					tel.value = tel.value.substr(0, 3) + "-" + tel.value.substr(3, 3) + "-" + tel.value.substr(6, 4);
				} else if (tel.value.length == 11) {
					tel.value = tel.value.substr(0, 3) + "-" + tel.value.substr(3, 4) + "-" + tel.value.substr(7, 4);
				}
			}
			if (!TEL_REGEXP.test(tel.value)) {
				tel.nextElementSibling.classList.add("active");
			}
		});
		email.addEventListener("focusout", () => {
			if (!EMAIL_REGEXP.test(email.value)) {
				email.nextElementSibling.classList.add("active");
			}
		});
		for (let elem of warning) {
			elem.addEventListener("click", () => {
				elem.classList.remove("active");
				elem.previousElementSibling.focus();
			});
		}
	},
	// 이용자 약관 부분 이벤트 설정 메소드
	setClauseEventListener: function() {
		let items = document.querySelectorAll(".btn_agreement");
		for (let item of items) {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				item.closest(".agreement").classList.toggle("open");
				item.lastElementChild.classList.toggle("fn-down2");
				item.lastElementChild.classList.toggle("fn-up2");
				item.firstElementChild.textContent = item.firstElementChild.textContent === "보기" ? "접기" : "보기";
			});
		}
	},
	// 예약하기 버튼 활성화 조건 체크 및 상태 변환 처리 메소드
	setConditionChecker: function() {
		let items = document.querySelectorAll("#name, #tel, #email, #chk3, .count_control");
		let name = document.querySelector("#name");
		let tel = document.querySelector("#tel");
		let email = document.querySelector("#email");
		let count = document.querySelector("#totalCount");
		let chk = document.querySelector("#chk3");
		let reserveBtn = document.querySelector(".bk_btn_wrap");
		for (let item of items) {
			let type = "focusout";
			if (item.type === "checkbox") type = "change";
			if (item.tagName === "DIV") type = "click";
			item.addEventListener(type, () => {
				setTimeout(() => {
					if (name.value === "" || name.nextElementSibling.classList.contains("active") ||
						tel.value === "" || tel.nextElementSibling.classList.contains("active") ||
						email.value === "" || email.nextElementSibling.classList.contains("active") ||
						Number.parseInt(count.textContent) === 0 ||
						!chk.checked) {
						reserveBtn.classList.add("disable");
						return;
					}
					reserveBtn.classList.remove("disable");
				}, 0);
			});
		}
	},
	// 예약하기 버튼 이벤트리스너 설정 메소드
	setBookingEventListener: function() {
		let bookingBtn = document.querySelector(".bk_btn");
		bookingBtn.addEventListener("click", () => {
			let booking = new Booking();
			booking.sendBookingRequest();
		});
	}
};

class Booking {
	// 예약 전송을 위한 기본값 설정
	constructor() {
		this.method = "POST";
		this.uri = "/api/reservations";
		this.displayInfoId = responseObj.displayInfo.displayInfoId;
		this.productId = responseObj.displayInfo.productId;
		this.reservationEmail = document.querySelector("#email").value;
		this.reservationName = document.querySelector("#name").value;
		this.reservationTelephone = document.querySelector("#tel").value;
		this.reservationYearMonthDay = new Date().toLocaleDateString();
	}

	// 예약 정보 서버로 전송
	sendBookingRequest() {
		let apiRequest = new APIRequest(this.method, this.uri, {
			displayInfoId: this.displayInfoId,
			productId: this.productId,
			reservationEmail: this.reservationEmail,
			reservationName: this.reservationName,
			reservationTelephone: this.reservationTelephone,
			reservationYearMonthDay: this.reservationYearMonthDay,
			prices: this.getReservationPrice()
		}, this.responseHandler);
		apiRequest.sendRequest();
	}

	// 예약 가격 정보를 가져오는 메소드
	getReservationPrice() {
		let result = [];
		let items = document.querySelectorAll(".qty");
		for (let item of items) {
			let controller = item.querySelector(".count_control_input");
			let count = controller.value;
			let productPriceId = controller.getAttribute("productPriceId");
			let reservationPrice = {
				count: count,
				productPriceId: productPriceId
			};
			result.push(reservationPrice);
		}
		return result;
	}

	// 수신한 응답을 처리하는 콜백 메소드
	responseHandler() {
		// P. 예매 성공, 실패 관련 처리를 조금 더 가다듬어야 한다.
		let response = JSON.parse(this.responseText);
		if (!response.reservationInfoId) {
			alert("예매에 실패하였습니다. 다시 시도해주세요.");
			return;
		}
		alert("예매가 완료되었습니다.");
		window.location.href = "/";
	}
}

document.addEventListener("DOMContentLoaded", () => {
	requestObj.executeProcess();
});