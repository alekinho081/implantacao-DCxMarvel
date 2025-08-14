class Cliente {
    constructor(user, senha, email, nome, sobrenome, CPF, telefone, endereco, formPag, tipo) {
        this.user = user,
            this.email = email,
            this.senha = senha,
            this.nome = nome,
            this.sobrenome = sobrenome,
            this.CPF = CPF,
            this.telefone = telefone,
            this.endereco = endereco,
            this.formPag = formPag,
            this.tipo = tipo

    }
}

class Produto {
    constructor(nome, cod, preco, descricao) {
        this.nome = nome,
            this.cod = cod,
            this.preco = preco,
            this.descricao = descricao
    }

    getDados() {
        return this
    }
}

