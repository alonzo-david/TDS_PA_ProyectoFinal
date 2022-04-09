
var frmLogin = document.getElementById('frm-login')

frmLogin.addEventListener('submit', event => {
    event.preventDefault()
    let usuario = document.getElementById('username')
    let pass = document.getElementById('password')

    
    window.comunicacion.buscarUsuario([usuario.value, pass.value]);

    window.comunicacion.retornarUsuario(function (event, existe) {
        let lblError = document.getElementById('lbl-error')

        if(existe){
            lblError.innerText = ""
            window.comunicacion.redireccionarProductos();
        }else{            
            lblError.innerText = "Usuario y/o contraseña incorrecto."
        }
    })

})