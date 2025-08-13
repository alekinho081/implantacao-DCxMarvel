function criaLogin() {
    if (localStorage.usrArr) {
        usr = JSON.parse(localStorage.getItem('usrArr')) //JSON - Javascript Object Notation: podem ser representados em forma de String e utilizaos em outas linguagens.
    }
    if (localStorage.snhArr) {
        snh = JSON.parse(localStorage.getItem('snhArr'))
    }
    let novoUsr = prompt("login:")
    usr.push(novoUsr)
    localStorage.usrArr = JSON.stringify(usr)
    let novaSnh = prompt("senha:")
    snh.push(novaSnh)
    localStorage.snhArr = JSON.stringify(snh)
    if (usr.includes(novoUsr) && snh.includes(novaSnh)) {
        alert("Login criado com sucesso!")
    } else {
        alert("Login não pode ser criado!")
    }
}

function abreTelaLogin() {
    if (localStorage.usrArr) {
        usr = JSON.parse(localStorage.getItem('usrArr'))
    }
    if (localStorage.snhArr) {
        snh = JSON.parse(localStorage.getItem('snhArr'))
    }
    login = prompt("login:")
    senha = prompt("senha:")
    let indUsr = usr.indexOf(login)
    if (usr[indUsr] == login && snh[indUsr] == senha) {
        localStorage.setItem('loginAutenticado', login)
        loginAut = localStorage.getItem('loginAutenticado')
        document.getElementById("log").innerHTML = `Bem-vindo, ${loginAut}`
    } else {
        alert("Digite um usuário/senha válidos!\nOu crie um login no link ao lado")
    }
}

module.exports = {abreTelaLogin, criaLogin}