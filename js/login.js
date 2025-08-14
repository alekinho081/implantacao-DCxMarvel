let clientes = JSON.parse(localStorage.getItem('clientes')) || []


function criaLogin(event) {
    event.preventDefault()
    let email = document.getElementById('email').value
    let user = document.getElementById('username').value
    let senha = document.getElementById('password').value
    let nome = document.getElementById('nome').value
    let sobrenome = document.getElementById('sobrenome').value
    let CPF = document.getElementById('cpf').value
    let telefone = document.getElementById('telefone').value
    let endereco = document.getElementById('endereco').value

    let novoCliente = new Cliente(user, senha, email, nome, sobrenome, CPF, telefone, endereco)
    clientes.push(novoCliente)

    window.location.href = 'login.html';
    localStorage.setItem('clientes', JSON.stringify(clientes))
}

function loginConta(event){
    event.preventDefault()

    let login = document.getElementById('login').value
    let senha = document.getElementById('password').value

    let clienteEncontrado = false;
    
    for (let cliente of clientes) {
        if ((cliente.user === login || cliente.email === login) && cliente.senha === senha) {
            alert('Logado com sucesso');
            localStorage.setItem('loginAutenticado', cliente.nome)
            window.location.href = 'index.html';
            clienteEncontrado = true;
            return; 
        }
    }

    if(!clienteEncontrado){
        alert('Login ou senha incorretos')
    }


}