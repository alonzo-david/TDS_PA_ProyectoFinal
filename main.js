const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'entrar123',
    database: 'supermercado'
})

var ventana
function createWindow() {
    ventana = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })
    ventana.maximize();
    ventana.loadFile('autenticar.html')
}

app.whenReady().then(createWindow)

ipcMain.on('redireccionarAutenticar', (event, args) => {
    ventana.loadFile('autenticar.html')
})

ipcMain.on('redireccionarProductos', (event, args) => {
    ventana.loadFile('productos.html')
})

ipcMain.on('redireccionarProducto', (event, args) => {
    ventana.loadFile('producto.html', {query: {"codProducto" : args[0]}})
})

ipcMain.on('redireccionarPedido', (event, args) => {
    ventana.loadFile('pedido.html',   {query: {"codProducto" : args[0]}})
})

ipcMain.on('buscarUsuario', (event, args) => {

    connection.promise().execute('SELECT * FROM autenticar WHERE id_autenticar = ? AND contrasenia = SHA1(?) ', args)
        .then(([results, fields]) => {

            if (results) {
                let existe = results.length > 0 ? true : false;
                ventana.webContents.send('retornarUsuario', existe);
            } else {
                ventana.webContents.send('retornarUsuario', false);
            }
        })

})

ipcMain.on('buscarProductos', (event, args) => {

    const consulta = `SELECT id_producto,
    nombre ,
    descripcion,
    categoria, 
    if(
        (SELECT SUM(cantidad) FROM pedido pe WHERE pe.id_producto = producto.id_producto) > 0, 
            CONCAT(existencia, '(',(SELECT SUM(cantidad) FROM pedido pe WHERE pe.id_producto = producto.id_producto),')'), existencia
    ) as existencia
    FROM producto;`

    connection.promise().execute(consulta)
        .then(([results, fields]) => {
            ventana.webContents.send('retornarProductos', results);
        })

})

ipcMain.on('buscarProducto', (event, args) => {

    connection.promise().execute('SELECT * FROM producto WHERE id_producto = ' + args)
        .then(([results, fields]) => {
            ventana.webContents.send('retornarProducto', results);
        })

})

ipcMain.on('realizarPedido', (event, args) => {
    connection.query(
        'INSERT INTO pedido(cantidad, id_producto, id_proveedor, id_empleado) VALUES(?,?,?,?)',
        args,
    )
    ventana.loadFile('productos.html')
})

ipcMain.on('actualizarProducto', (event, args) => {
    connection.query(
        "UPDATE producto SET nombre = ?, descripcion = ?, categoria = ?, existencia = ? WHERE id_producto = ?",
        args,
    )
    ventana.loadFile('productos.html')
})

ipcMain.on('buscarProveedor', (event, args) => {

    connection.promise().execute('SELECT * FROM proveedor')
        .then(([results, fields]) => {
            ventana.webContents.send('retornarProveedor', results);
        })

})

