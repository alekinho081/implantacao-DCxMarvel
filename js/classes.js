class Cliente {
    constructor(user, senha, nome, sobrenome, CPF, telefone, endereco, formPag) {
        this.user = user,
            this.senha = senha,
            this.nome = nome,
            this.sobrenome = sobrenome,
            this.CPF = CPF,
            this.telefone = telefone,
            this.endereco = endereco,
            this.formPag = formPag
    }

    criaLogin() {

    }
}

class Produto {
    constructor(nome, cod, preco, link, descricao) {
        this.nome = nome,
            this.cod = cod,
            this.preco = preco,
            this.link = link,
            this.descricao = descricao
    }

    getDados() {
        return this
    }
}