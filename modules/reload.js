export function reloadTransactions(arr, place) {

    place.innerHTML = ""

    for (let item of arr) {

        let trans_item = document.createElement('div')
        let trans_row__left = document.createElement('div')
        let time = document.createElement('span')
        let day = document.createElement('span')
        let trans_currency = document.createElement('img')

        let trans_row__center = document.createElement('div')
        let trans_waiting = document.createElement('div')
        let trans_id = document.createElement('span')

        let trans_row__right = document.createElement('div')
        let amount = document.createElement('span')
        let btn = document.createElement('button')

        trans_item.classList.add("trans-item")
        trans_item.classList.add("trans-row")

        trans_row__left.classList.add("trans-row")
        trans_row__left.classList.add("trans-row__left")

        trans_currency.classList.add("trans-currency")
        trans_currency.src = "/public/icons/ellipse.svg"
        trans_currency.style.backgroundImage = ` url('/public/icons/${item.img}.svg')`
        trans_currency.alt = "currency"

        time.innerHTML = item.date.time
        day.innerHTML = item.date.day

        trans_row__center.classList.add("trans-row__center")
        trans_row__center.classList.add("trans-row")
        trans_waiting.classList.add("trans_waiting")
        trans_id.classList.add("trans-id")

        trans_waiting.style.backgroundImage = `url("/public/icons/${item.succes.includes("false")}Arrow.svg")`
        trans_id.innerHTML = item.id

        trans_row__right.classList.add("trans-row__right")
        trans_row__right.classList.add("trans-row")

        amount.classList.add("amount")
        amount.innerHTML = item.sum + " " + item.currency

        if (item.succes === "false") {
            btn.innerHTML = "Error"
            btn.classList.add("btn-error")
            btn.classList.remove("btn-complete")
        }
        else if (item.succes === "Waiting") {
            btn.innerHTML = item.succes
            btn.classList.remove("btn-error")
            btn.classList.remove("btn-complete")
        }
        else {
            btn.innerHTML = "Complete"
            btn.classList.add("btn-complete")
            btn.classList.remove("btn-error")
        }

        trans_item.append(trans_row__left, trans_row__center, trans_row__right)
        trans_row__left.append(time, day, trans_currency)
        trans_row__center.append(trans_waiting, trans_id)
        trans_row__right.append(amount, btn)
        place.append(trans_item)

    }
}