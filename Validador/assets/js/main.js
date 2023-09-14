class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const camposValidos = this.camposSaoValidos()
        const senhaValidas = this.senhasSaoValidas()

        if(camposValidos && senhaValidas){
            alert('Enviado')
            this.formulario.submit()
        }
    }

    senhasSaoValidas(){
        let valid = true

        const senha = this.formulario.querySelector('.senha')
        const confirmaSenha = this.formulario.querySelector('.confirma-senha')

        if(senha.value !== confirmaSenha.value){
            this.criarErro(senha, 'Campos senha e repetir senha precisa ser iguais')
            this.criarErro(confirmaSenha, 'Campos senha e repetir senha precisa ser iguais')
            valid = false
        }
        
        if(senha.value.length < 6 || senha.value,length > 12){
            this.criarErro(senha,  'Senha precisa estar entre 6 a 12 caracteres')
            valid = false
        }

        return valid
    }

    camposSaoValidos(){
        let valid =true

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove()
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerHTML;
            if(!campo.value){
                this.criarErro(campo, `Campo "${label}" não pode estar em branco`)
                valid = false
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false
            }
            
        }
        return valid;
    }

    validaCPF(campo){   
        const cpf = new ValidaCPF(campo.value)

        if(!cpf.valida()){
            this.criarErro(campo, 'CPF inválido.')
            return false
        }
        return true
    }

    validaUsuario(campo){
        const usuario = campo.value
        let valid = true

        if(usuario.length < 3 || usuario.length > 12){
            this.criarErro(campo, 'Usuario precisa ter entre 3 a 12 caracteres.')
            valid = false
        }

        if(!usuario.match(/[a-zA-Z0-9]+$/g)){
            this.criarErro(campo, 'Usuario precisa conter apenas letras e/ou números.')
            valid = false
        }
        return valid
    }


    criarErro(campo, msg){
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }
}
const valida = new ValidaFormulario()
