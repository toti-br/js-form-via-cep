let form = document.querySelector('#form-busca-cep')
let containerResultados = document.querySelector('#resultados')


form.addEventListener('submit', onFormSubmit)


function onFormSubmit(event) {
    event.preventDefault()

    let fd = new FormData(form)
    let cep = fd.get('cep')

    if (!validaCEP(cep)) {
        alert('O formato do CEP está errado!')
        return
    }

    buscaDadosCEP(cep)
}

function validaCEP(cep) {
    if (cep.length !== 8) {
        return false
    }
    return true
}

function buscaDadosCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((resposta) => {
        return resposta.json()
    })
    .then((dadosCEP) => {
        let lista = construirElementoResultados(dadosCEP)
        containerResultados.innerHTML = ''
        containerResultados.append(lista)
    })
}

function construirElementoResultados(resultadoPesquisa) {
    let lista = document.createElement('ul')

    let itens = [ 'Bairro', 'Complemento', 'Localidade', 'Logradouro', 'UF' ]

    for (let item of itens) {
        let li = document.createElement('li')

        let rotulo = document.createElement('strong')
        rotulo.textContent = item + ':'

        let valor = document
            .createTextNode(' ' + resultadoPesquisa[item.toLowerCase()])

        li.appendChild(rotulo)
        li.appendChild(valor)

        lista.appendChild(li)
    }

    return lista
}