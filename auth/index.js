import { useHttp } from "../modules/http.requests";

const data_back = document.querySelector('button[data-back]')
const data_front = document.querySelector('button[data-front]')
const card = document.querySelector('.card')

let arr = [data_back, data_front]

arr.forEach((btn, idx) => {
    btn.onclick = () => {
        if(idx == 0) {
            arr[idx].setAttribute('disabled', true)
            arr[idx + 1].removeAttribute('disabled')
        } else {
            arr[idx].setAttribute('disabled', true)
            arr[idx - 1].removeAttribute('disabled')
        }
        card.classList.toggle('active')
    }
});


const {request} = useHttp()

const signup = document.forms.signup
let loading = false

signup.onsubmit = (e) => {
    e.preventDefault();
    loading = true
    
    let user = {}

    let fm = new FormData(signup)

    fm.forEach((value, key) => {
        user[key] = value
    })

    request("/users", "get")
        .then(res => {
            if(res === 404) {
                alert('something went wrong')
            }
            console.log(res);
            loading = false
        })
}