let login = '', senha, qtdCont = 0, valor = 0, totalGeral = 0, cesta, loginAut
let article, div, div2, h3, p1, input, p2, span, aLink, main, section, footer, h2, p3, span2, aLink2

let produtos = JSON.parse(localStorage.getItem('prods')) || []
let produtosCarrinho = localStorage.getItem('carrinho') || []

function criaProduto(event) {
    let nome = document.getElementById('produto').value
    let cod = document.getElementById('codigo').value
    let preco = parseFloat(document.getElementById('preco').value)
    let desc = document.getElementById('descricao').value

    const inputArquivo = document.getElementById('arq');
    const nomeImagem = inputArquivo.files.length > 0 ? inputArquivo.files[0].name : 'padrao.jpg';

    let produto = new Produto(nome, cod, preco, desc, nomeImagem)
    produtos.push(produto)

    localStorage.setItem('prods', JSON.stringify(produtos))
}

function montaHTML() {
    const produtos = JSON.parse(localStorage.getItem('prods')) || [];

    main = document.createElement('main');
    main.setAttribute('class', 'container');
    document.body.append(main);

    section = document.createElement('section');
    section.setAttribute('class', 'products-container');
    main.append(section);


    produtos.forEach((produto, i) => {
        article = document.createElement('article');
        article.setAttribute('class', 'card');
        section.append(article);

        div = document.createElement('div');
        div.setAttribute('class', 'product-image');
        div.setAttribute('id', 'img-' + i);
        article.append(div);


        const imagemUrl = produto.imagem ? '../imagens/' + produto.imagem : '../imagens/padrao.jpg';
        document.getElementById('img-' + i).style.backgroundImage = `url(${imagemUrl})`;

        h3 = document.createElement('h3');
        h3.setAttribute('id', 'nome' + i);
        h3.innerHTML = produto.nome;
        article.append(h3);

        p1 = document.createElement('p');
        p1.innerHTML = 'Qtd: ';
        p1.setAttribute('hidden', 'true');
        input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('value', '1');
        input.setAttribute('min', '1');
        input.setAttribute('max', '10');
        input.setAttribute('hidden', 'true');
        input.setAttribute('id', 'qtd-' + i);
        p1.append(input);
        article.append(p1);

        p2 = document.createElement('p');
        p2.innerHTML = 'R$ ';
        span = document.createElement('span');
        span.setAttribute('id', produto.cod);
        span.setAttribute('class', 'bold');
        span.innerHTML = Number(produto.preco).toFixed(2).replace('.', ',');
        p2.append(span);
        article.append(p2);

        aLink = document.createElement('a');
        aLink.setAttribute('onclick', "adicionarAoCarrinho(" + i + ")");
        aLink.setAttribute('class', 'btn');
        aLink.setAttribute('href', '#'); 
        aLink.innerHTML = 'Comprar';
        article.append(aLink);
    });

    footer = document.createElement('footer');
    footer.setAttribute('id', 'rodape');
    document.body.append(footer);

    h2 = document.createElement('h2');
    h2.innerHTML = 'Informações sobre o site';
    footer.append(h2);

    p3 = document.createElement('p');
    p3.innerHTML = '&copy; 2023 ';
    footer.append(p3);

    span2 = document.createElement('span');
    span2.setAttribute('class', 'bold');
    span2.innerHTML = 'Loja dos Nerds';
    p3.append(span2);

    aLink2 = document.createElement('a');
    aLink2.setAttribute('id', 'adm');
    aLink2.setAttribute('href', 'atualizacao.html');
    aLink2.innerHTML = 'Administração';
    footer.append(aLink2);

    let logA = localStorage.getItem('loginAutenticado');
    if (logA == "null" || logA == "undefined") {
        document.getElementById("log").innerHTML = 'login';
    } else {
        document.getElementById("log").innerHTML = `Bem-vindo, ${localStorage.getItem('loginAutenticado')}`;
    }
}

function adicionarAoCarrinho(index){
    produtosCarrinho.push(index)

    localStorage.setItem('carrinho', produtosCarrinho)
}