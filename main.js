import { transactions } from "./modules/db"
import { reloadTransactions } from "./modules/reload"

let conts = document.querySelectorAll('main .container')
let tabs = document.querySelectorAll("aside p")

conts.forEach((cont, idx) => {
	if (idx !== 0) {
		cont.classList.add('hide')
	}
})

tabs.forEach(btn => {
	let key = btn.id
	btn.style.backgroundImage = `url("/public/icons/${key}.svg")`

	btn.onclick = () => {
		tabs.forEach(btn => btn.classList.remove("active_link"))
		btn.classList.add("active_link")

		conts.forEach(cont => cont.classList.add('hide'))

		let cont = document.querySelector(`#cont-${key}`)
		console.log(cont);
		cont.classList.remove('hide')
	}
})

let trans_column = document.querySelector(".trans-column")
let trans_smoke = document.querySelector(".trans-wrapper .after")

reloadTransactions(transactions, trans_column)

if (trans_column.childElementCount <= 4) {
	trans_smoke.style.display = "none"
}

trans_column.onscroll = () => {

	if (trans_column.scrollTop <= 950) {
		trans_smoke.style.bottom = "0px"
	} else {
		trans_smoke.style.bottom = "-100px"
	}

	console.log(trans_column.scrollTop);

}

trans_smoke.onclick = () => {

	trans_column.scrollTop = trans_column.scrollHeight;

}

let filterBtns = document.querySelectorAll('.trans-btns button')

filterBtns.forEach(btn => {
	btn.onclick = () => {
		filterBtns.forEach(btn => btn.classList.remove("trans-btn_active"))
		btn.classList.add("trans-btn_active")
	}
})

let hystory = document.querySelector(".trans-title button")

hystory.onclick = () => {
	console.log(transactions);
}