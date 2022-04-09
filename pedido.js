let btnRegresar = document.getElementById('btn-regresar')

btnRegresar.addEventListener('click', function(){
    window.comunicacion.redireccionarProductos();
})


document.addEventListener('DOMContentLoaded', function (event) {

    let i_cod = document.getElementById('cod')
    let i_nombre = document.getElementById('nombre')

    const queryString = window.location.search;
    const codProducto = queryString.split('codProducto=')[1]

    if(codProducto != '' && codProducto != undefined){
        window.comunicacion.buscarProducto(codProducto);

        window.comunicacion.retornarProducto(function (event, args) {
            args.forEach(function (fila) {
                i_cod.value = fila.id_producto
                i_nombre.value = fila.nombre
            })
        })      
    }

    window.comunicacion.buscarProveedor()
    window.comunicacion.retornarProveedor(function (event, args) {
        var option = ''
        args.forEach(function (fila) {
            option += `<option value="${fila.id_proveedor}" >${fila.nombre}</option>`            
        })
        document.querySelector('#proveedor').innerHTML = option
    })
})

var frmPedido = document.getElementById('frm-pedido')

frmPedido.addEventListener('submit', event => {
    event.preventDefault()

    let i_cod = document.getElementById('cod')
    let i_nombre = document.getElementById('nombre')
    let i_proveedor = document.getElementById('proveedor')
    let i_cantidad = document.getElementById('cantidad')

    window.comunicacion.realizarPedido([i_cantidad.value, i_cod.value, i_proveedor.value, 1]);
})