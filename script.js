class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    getSaldo() {
        return this.saldo;
    }

    setSaldo(novoSaldo) {
        this.saldo = novoSaldo;
    }

    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }

    depositar(valor) {
        this.saldo += valor;
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, "Conta Corrente", saldo);
        this.cartaoCredito = cartaoCredito;
    }

    getCartaoCredito() {
        return this.cartaoCredito;
    }

    setCartaoCredito(novoCartaoCredito) {
        this.cartaoCredito = novoCartaoCredito;
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Poupança", saldo);
    }
}

class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, "Conta Universitária", saldo);
    }

    sacar(valor) {
        if (valor <= 500 && valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }
}

const listaDeContas = [];

function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const saldo = parseFloat(document.getElementById("saldo").value);

    let conta;

    if (tipo === "Conta Corrente") {
        const cartaoCredito = document.getElementById("cartaoCredito").value;
        conta = new ContaCorrente(agencia, numero, saldo, cartaoCredito);
    } else if (tipo === "Conta Poupança") {
        conta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipo === "Conta Universitária") {
        conta = new ContaUniversitaria(agencia, numero, saldo);
    }

    listaDeContas.push(conta);

    // Limpar os campos do formulário
    document.getElementById("agencia").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("tipo").value = "Conta Corrente";
    document.getElementById("saldo").value = "";
    document.getElementById("cartaoCredito").value = "";
}

function visualizarContas() {
    const listaContasDiv = document.getElementById("listaContas");
    const contasDropdown = document.getElementById("contasDropdown");
    listaContasDiv.innerHTML = "";
    contasDropdown.innerHTML = "<option value=''>Selecione uma conta</option>";

    for (let i = 0; i < listaDeContas.length; i++) {
        const conta = listaDeContas[i];
        listaContasDiv.innerHTML += `
            <p>
                Agência: ${conta.agencia}<br>
                Número da Conta: ${conta.numero}<br>
                Tipo de Conta: ${conta.tipo}<br>
                Saldo: ${conta.getSaldo()}<br>
                ${conta.tipo === "Conta Corrente" ? `Cartão de Crédito: ${conta.getCartaoCredito()}<br>` : ""}
            </p>
        `;
        // Preencher o dropdown com as contas existentes
        contasDropdown.innerHTML += `<option value="${i}">${conta.numero} (${conta.tipo})</option>`;
    }
}

function deletarConta() {
    const contasDropdown = document.getElementById("contasDropdown");
    const selectedIndex = contasDropdown.selectedIndex;

    if (selectedIndex !== -1) {
        const contaIndex = parseInt(contasDropdown.value);
        if (contaIndex >= 0 && contaIndex < listaDeContas.length) {
            listaDeContas.splice(contaIndex, 1);
            visualizarContas(); // Atualizar a lista de contas após a exclusão
        }
    }
}