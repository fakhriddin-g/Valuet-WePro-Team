import { transactions } from "./modules/db"
import { reloadTransactions } from "./modules/reload"

let conts = document.querySelectorAll('main .container')
let tabs = document.querySelectorAll("aside p")

conts.forEach((cont, idx) => {
	if (idx !== 2) {
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

		cont.classList.remove('hide')
	}
})

let trans_column = document.querySelector(".trans-column")

reloadTransactions(transactions, trans_column)

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