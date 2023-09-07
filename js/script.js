const form = document.querySelector('form');
const pesquisaCep = document.querySelector('#cep');
//limpa formulario
const limpaForm = () => {

    document.querySelector('#uf').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#logradouro').value = '';
};
//calback
const meuCallback = (conteudo) =>{
    if (!('erro' in conteudo)){
        document.querySelector('#uf').value = (conteudo.uf);
        document.querySelector('#cidade').value = (conteudo.localidade);
        document.querySelector('#bairro').value = (conteudo.bairro);
        document.querySelector('#logradouro').value = (conteudo.logradouro);

    }
    else{
        //cep não encontrado
        limpaForm();
        alert('CEP não encontrado');
    }

};

form.onsubmit = () => false;
//envento que preenche automaticamente o endereço de acordo com o cep informado
pesquisaCep.addEventListener('blur', () => {
    //elimina caracteres especiais deixando somente numeros
    let cep = pesquisaCep.value.replace(/\D/g,'');
    // verificar se o campo cep posssui algum valor informado
    if (cep !=''){
        //validar o cep
        let validaCep = /^[0-9]{8}$/;
        //falida formato cep    
        if (validaCep.test(cep)){
            //cria elemento js
            let script = document.createElement('script');

            //sicroniza callback
            script.src = 'http://viacep.com.br/ws/' + cep + '/json/?callback=meuCallback';
            //insere o script no documento e carrega o conteudo 
            document.body.appendChild(script);

        }
        else {
            //chama limpaform
            limpaForm();
            alert('CEP inválido.');
        }
    }

});

