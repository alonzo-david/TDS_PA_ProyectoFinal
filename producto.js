let btnRegresar = document.getElementById('btn-regresar')

btnRegresar.addEventListener('click', function(){
    
    window.comunicacion.redireccionarProductos();
})


document.addEventListener('DOMContentLoaded', function (event) {
    let i_cod = document.getElementById('cod')
    let i_nombre = document.getElementById('nombre')
    let i_descripcion = document.getElementById('descripcion')
    let i_categoria = document.getElementById('categoria')
    let i_existencia = document.getElementById('existencia')

    console.log('producto')
    const queryString = window.location.search;
    const codProducto = queryString.split('codProducto=')[1]

    console.log(codProducto)
    if(codProducto != '' && codProducto != undefined){
        window.comunicacion.buscarProducto(codProducto);

        window.comunicacion.retornarProducto(function (event, args) {
            args.forEach(function (fila) {
                i_cod.value = fila.id_producto
                i_nombre.value = fila.nombre
                i_descripcion.value = fila.descripcion
                i_categoria.value = fila.categoria
                i_existencia.value = fila.existencia
            })
        })      
    }
    
})

var frmProducto = document.getElementById('frm-producto')

frmProducto.addEventListener('submit', event => {
    event.preventDefault()

    let i_cod = document.getElementById('cod')
    let i_nombre = document.getElementById('nombre')
    let i_descripcion = document.getElementById('descripcion')
    let i_categoria = document.getElementById('categoria')
    let i_existencia = document.getElementById('existencia')

    window.comunicacion.actualizarProducto([i_nombre.value, i_descripcion.value, i_categoria.value, i_existencia.value, i_cod.value]);

})