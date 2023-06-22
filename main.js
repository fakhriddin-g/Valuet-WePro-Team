let conts = document.querySelectorAll('.container')
let tabs = document.querySelectorAll("aside p")

conts.forEach(cont => cont.classList.add('hide'))

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



