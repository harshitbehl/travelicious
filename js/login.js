let signup = document.getElementsByClassName("signup")[0]
let login = document.getElementsByClassName("login")[0]

function switchLogin() {
    if ((login.style.display = 'flex') || (signup.style.display = 'none')) {
        signup.style.display = 'flex'
        login.style.display = 'none'
    }
}

function switchSignup() {
    if ((signup.style.display = 'flex') || (login.style.display = 'none')) {
        login.style.display = 'flex'
        signup.style.display = 'none'
    }
}