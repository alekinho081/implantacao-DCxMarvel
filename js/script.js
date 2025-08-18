let login = '', senha, qtdCont = 0, valor = 0, totalGeral = 0, cesta;
let article, div, div2, h3, p1, input, p2, span, aLink, main, section, footer, h2, p3, span2, aLink2;

let produtos = JSON.parse(localStorage.getItem('prods')) || [];
let clientes = []

if (!localStorage.getItem('clientes')){
    const adm = new Cliente('adm', 'admin', 'adm@admin.com', 'admin', 'admin', '12346567123', '48999999999', 'Rua Jailton', 'adm')
    clientes.push(adm)
    localStorage.setItem('clientes', JSON.stringify(clientes))
}


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
        input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('value', '1');
        input.setAttribute('min', '1');
        input.setAttribute('max', '10');
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
        aLink.setAttribute('onclick', "adicionarAoCarrinho(" + i + ", event)");
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

    if (localStorage.getItem('clienteTipo') == 'adm') {
        aLink2 = document.createElement('a');
        aLink2.setAttribute('id', 'adm');
        aLink2.setAttribute('href', 'atualizacao.html');
        aLink2.innerHTML = 'Administração';
        footer.append(aLink2);
    }


    let logA = localStorage.getItem('loginAutenticado');
    if (logA == "null" || logA == "undefined") {
        document.getElementById("log").innerHTML = 'login';
    } else {
        document.getElementById("log").innerHTML = `Bem-vindo, ${localStorage.getItem('loginAutenticado')}`;
    }
}


let carrinho;

try {
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
} catch (e) {
    console.error("Erro ao carregar carrinho:", e);
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}


function adicionarAoCarrinho(index, event) {
    event.preventDefault();


    let carrinhoAtual;
    try {
        carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
        carrinhoAtual = [];
    }

    const usuario = localStorage.getItem('loginAutenticado');
    if (!usuario || usuario === "null" || usuario === "undefined") {
        alert("Por favor, faça login antes de adicionar itens ao carrinho.");
        window.location.href = "login.html";
        return;
    }

    const inputQuantidade = document.getElementById('qtd-' + index);
    const quantidade = parseInt(inputQuantidade.value);

    if (isNaN(quantidade) || quantidade < 1) {
        alert("Quantidade inválida!");
        inputQuantidade.focus();
        return;
    }

    const produto = produtos[index];
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const itemExistenteIndex = carrinhoAtual.findIndex(item =>
        item.produto &&
        item.produto.cod === produto.cod &&
        item.usuario === usuario
    );

    if (itemExistenteIndex >= 0) {
        carrinhoAtual[itemExistenteIndex].quantidade += quantidade;
    } else {
        carrinhoAtual.push({
            produto: produto,
            quantidade: quantidade,
            usuario: usuario,
            data: new Date().toISOString()
        });
    }


    carrinho = carrinhoAtual;
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));

    inputQuantidade.value = 1;
    alert(`${quantidade} ${produto.nome}(s) adicionado(s) ao carrinho!`);

}


function getCarrinhoUsuario() {
    const usuario = localStorage.getItem('loginAutenticado');
    if (!usuario) return [];

    try {
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        return carrinhoAtual.filter(item => item.usuario === usuario);
    } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
        return [];
    }
}


function mostrarCarrinho() {
    const itens = getCarrinhoUsuario();
    const container = document.getElementById('carrinho') || criarContainerCarrinho();

    // Configuração da animação
    container.style.transition = 'all 0.3s ease';
    container.style.opacity = '0';
    container.style.transform = 'translateX(20px)';

    // Força o reflow para garantir que a animação funcione
    void container.offsetWidth;

    if (itens.length === 0) {
        container.innerHTML = `
            <div class="carrinho-cabecalho">
                <h3>Seu Carrinho</h3>
                <button class="fechar-carrinho" onclick="fecharCarrinho()">×</button>
            </div>
            <p>Carrinho vazio</p>
        `;
        container.style.opacity = '1';
        container.style.transform = 'translateX(0)';
        return;
    }

    let html = `
        <div class="carrinho-cabecalho">
            <h3>Seu Carrinho</h3>
            <button class="fechar-carrinho" onclick="fecharCarrinho()">×</button>
        </div>
        <ul>`;

    let total = 0;

    itens.forEach((item, index) => {
        if (!item.produto) return;

        const subtotal = item.produto.preco * item.quantidade;
        total += subtotal;

        html += `
            <li style="animation: fadeIn 0.3s ease ${index * 0.1}s forwards; opacity: 0;">
                ${item.quantidade}x ${item.produto.nome} - 
                R$ ${subtotal.toFixed(2).replace('.', ',')}
                <button class="remover-item" onclick="removerItem('${item.produto.cod}')">×</button>
            </li>
        `;
    });

    html += `</ul>
        <div class="carrinho-rodape">
            <p style="animation: fadeIn 0.3s ease ${itens.length * 0.1 + 0.1}s forwards; opacity: 0;">
                Total: R$ ${total.toFixed(2).replace('.', ',')}
            </p>
            
            <div class="metodo-pagamento" style="animation: fadeIn 0.3s ease ${itens.length * 0.1 + 0.2}s forwards; opacity: 0; margin-bottom: 15px;">
                <label for="metodo-pagamento">Método de Pagamento:</label>
                <select id="metodo-pagamento" class="select-pagamento">
                    <option value="credito">Cartão de Crédito</option>
                    <option value="debito">Cartão de Débito</option>
                    <option value="pix">PIX</option>
                    <option value="boleto">Boleto Bancário</option>
                    <option value="dinheiro">Dinheiro</option>
                </select>
            </div>
            
            <button class="finalizar-compra" onclick="finalizarCompra()">Finalizar Compra</button>
        </div>`;

    container.innerHTML = html;

    // Anima a aparecimento
    container.style.opacity = '1';
    container.style.transform = 'translateX(0)';
}

// Atualize a função finalizarCompra para pegar o método selecionado
function finalizarCompra() {
    const itens = getCarrinhoUsuario();
    if (itens.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const metodoPagamento = document.getElementById('metodo-pagamento').value;
    const metodoTexto = document.getElementById('metodo-pagamento').options[document.getElementById('metodo-pagamento').selectedIndex].text;

    // Aqui você pode adicionar a lógica específica para cada método de pagamento
    alert(`Compra finalizada com ${metodoTexto}!`);

    // Limpa o carrinho após finalizar
    const usuario = localStorage.getItem('loginAutenticado');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.usuario !== usuario);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Fecha o carrinho
    fecharCarrinho();
}

// Atualize os estilos para incluir o novo elemento
function adicionarEstilosCarrinho() {
    const style = document.createElement('style');
    style.textContent = `
        /* ... (mantenha todos os estilos anteriores) ... */
        
        .metodo-pagamento {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .metodo-pagamento label {
            font-size: 0.9rem;
            color: #555;
        }
        
        .select-pagamento {
            width: 100%;
            padding: 8px 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            font-size: 0.9rem;
        }
        
        .select-pagamento:focus {
            outline: none;
            border-color: #4CAF50;
        }
    `;
    document.head.appendChild(style);
}

function fecharCarrinho() {
    const container = document.getElementById('carrinho');
    if (!container) return;

    container.style.opacity = '0';
    container.style.transform = 'translateX(20px)';


    setTimeout(() => {
        container.innerHTML = '';
    }, 300);
}

function finalizarCompra() {
    const itens = getCarrinhoUsuario();
    if (itens.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }


    alert('Compra finalizada com sucesso!');


    const usuario = localStorage.getItem('loginAutenticado');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.usuario !== usuario);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));


    fecharCarrinho();
}

function adicionarEstilosCarrinho() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        #carrinho {
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            width: 300px;
            max-height: 80vh;
            overflow-y: auto;
            background: white;
        }
        
        .carrinho-cabecalho {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: #f5f5f5;
            border-bottom: 1px solid #ddd;
        }
        
        .carrinho-cabecalho h3 {
            margin: 0;
            font-size: 1.2rem;
        }
        
        .fechar-carrinho {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0 10px;
            transition: transform 0.2s;
        }
        
        .fechar-carrinho:hover {
            transform: scale(1.2);
        }
        
        #carrinho ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        #carrinho li {
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .remover-item {
            background: #ff4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .remover-item:hover {
            transform: scale(1.1);
        }
        
        .carrinho-rodape {
            padding: 15px;
            background: #f9f9f9;
            border-top: 1px solid #ddd;
        }
        
        .carrinho-rodape p {
            font-weight: bold;
            margin: 0 0 10px 0;
            font-size: 1.1rem;
        }
        
        .finalizar-compra {
            width: 100%;
            padding: 10px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s;
        }
        
        .finalizar-compra:hover {
            background: #45a049;
        }
    `;
    document.head.appendChild(style);
}


function criarContainerCarrinho() {
    const div = document.createElement('div');
    div.id = 'carrinho';
    div.style.position = 'fixed';
    div.style.top = '20px';
    div.style.right = '20px';
    div.style.zIndex = '1000';
    div.style.opacity = '0';
    div.style.transform = 'translateX(20px)';
    div.style.transition = 'all 0.3s ease';
    document.body.appendChild(div);
    return div;
}


adicionarEstilosCarrinho();

function removerItem(codigo) {
    try {
        let carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        const usuario = localStorage.getItem('loginAutenticado');

        carrinhoAtual = carrinhoAtual.filter(item =>
            !(item.produto && item.produto.cod === codigo && item.usuario === usuario)
        );

        carrinho = carrinhoAtual;
        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
        mostrarCarrinho();
    } catch (e) {
        console.error("Erro ao remover item:", e);
    }
}