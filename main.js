import { transactions } from "./modules/db"
import { v4 as uuidv4 } from 'uuid';
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
let trans_smoke = document.querySelector(".trans-wrapper .trans-after")

reloadTransactions(transactions, trans_column)

// trans_column.innerHTML = ""

if (trans_column.childElementCount <= 4) {
	trans_smoke.style.display = "none"
} else {
	trans_smoke.style.display = "block"

}

console.log(trans_column.childElementCount,);

trans_column.onscroll = () => {

	if (trans_column.scrollTop < (trans_column.scrollHeight - 401)) {
		trans_smoke.style.bottom = "0px"
	} else {
		trans_smoke.style.bottom = "-100px"
	}
}

trans_smoke.onclick = () => {
	console.log(trans_column.scrollTop , (trans_column.scrollHeight - 400));

	trans_column.scrollTop = trans_column.scrollHeight;

}

let filterBtns = document.querySelectorAll('.trans-btns button')

filterBtns.forEach(btn => {
	btn.onclick = () => {
		filterBtns.forEach(btn => btn.classList.remove("trans-btn_active"))
		btn.classList.add("trans-btn_active")
	}
})

let hystory = document.querySelector(".trans-title #hystory")
let addTransBtn = document.querySelector(".trans-title #addTransaction")
let trans_modal_bg = document.querySelector(".trans-modal_bg")
let trans_modal = document.querySelector(".trans-modal")

addTransBtn.onclick = () => {
	trans_modal_bg.style.display = "block"

	setTimeout(() => {

		trans_modal_bg.style.opacity = "1"
		trans_modal.style.left = "37%"

	}, 500);
}

hystory.onclick = () => {
	console.log(transactions);
}

trans_modal_bg.onclick = () => {

	trans_modal_bg.style.opacity = "0"
	trans_modal.style.left = "-30%"
	setTimeout(() => {
		trans_modal_bg.style.display = "none"
	}, 500);

}
let currency_list = document.querySelector("#currency-list")
let currency_inp = document.querySelector(".inp-currency")
let localedSymbols = JSON.parse(localStorage.getItem("symbols"))


if (!localedSymbols) {

	axios.get(import.meta.env.VITE_CURRENCY_API, {
		headers: {
			apiKey: import.meta.env.VITE_API_KEY
		}
	})
		.then(res => {
			if (res.status === 200 || res.status === 201) {
				localStorage.setItem("symbols", JSON.stringify(res.data.symbols))
				setOption(res.data.symbols)
			}
		})

}
else {
	setOption(localedSymbols)
}

function setOption(data) {


	for (let key in data) {
		let opt = new Option(data[key], key)

		currency_list.append(opt)

	}

}

let addTransaction = document.forms.addTransaction
let trans_inputs = document.addTransaction.querySelectorAll("input")


addTransaction.onsubmit = (e) => {
	e.preventDefault()

	let filled = true

	trans_inputs.forEach(inp => {
		inp.classList.remove("error")
		inp.style.border = "none"

		if (inp.value.length === 0) {
			filled = false
			inp.style.border = "1px solid red"
		}
	})

	if (filled) {
		let random = ["Waiting", "true", "false"]
		let transaction = {
			id: uuidv4(),
			succes: random[Math.floor(Math.random()) * random.length],
			date: {
				time: "AM " + new Date().getHours() + ":" + new Date().getMinutes(),
				day: new Date().getDate() + " dec " + new Date().getFullYear()
			}
		}

		let fm = new FormData(addTransaction)

		fm.forEach((value, key) => {
			transaction[key] = value
		})

		trans_modal_bg.style.opacity = "0"
		trans_modal.style.left = "-30%"

		setTimeout(() => {
			trans_modal_bg.style.display = "none"
		}, 500);

		console.log(transaction);
		addTransaction.reset()
		transactions.push(transaction)
		reloadTransactions(transactions, trans_column)

	}
}

let valuts = {
	"BTC": "bitcoin"
}

currency_inp.oninput = () => {
	currency_inp.style.backgroundImage = `url("/public/icons/ellipse.svg"), url("/public/icons/${valuts[currency_inp.value]}.svg")`
}


