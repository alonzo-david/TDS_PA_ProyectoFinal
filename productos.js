
let btnSalir = document.getElementById('btn-salir')

btnSalir.addEventListener('click', function(){    
    window.comunicacion.redireccionarAutenticar();
})


function Editar(e){
    var value = e.parentNode.parentNode.cells[0].innerHTML;

    window.comunicacion.redireccionarProducto([value]);
}

function Pedido(e){
    var value = e.parentNode.parentNode.cells[0].innerHTML;
        
    window.comunicacion.redireccionarPedido([value]);
}

document.addEventListener('DOMContentLoaded', function (event) {

    window.comunicacion.buscarProductos()
    window.comunicacion.retornarProductos(function (event, args) {

        var tbl = ''
        args.forEach(function (fila) {
            tbl += '<tr>'
            tbl += '<td>'
            tbl += fila.id_producto
            tbl += '</td>'
            tbl += '<td>'
            tbl += fila.nombre
            tbl += '</td>'
            tbl += '<td>'
            tbl += fila.descripcion
            tbl += '</td>'
            tbl += '<td>'
            tbl += fila.categoria
            tbl += '</td>'
            tbl += '<td>'
            tbl += fila.existencia
            tbl += '</td>'
            tbl += '<td>'
            tbl += "<button class='btn btn-primary ' onclick='Editar(this)' >Editar</button>"
            tbl += '</td>'
            tbl += '<td>'
            tbl += "<button class='btn btn-primary' onclick='Pedido(this)' >Pedido</button>"
            tbl += '</td>'
            tbl += '</tr>'
        })

        document.querySelector('#tbl-registros > tbody').innerHTML = tbl
    })
})