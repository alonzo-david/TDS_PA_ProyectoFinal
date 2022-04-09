const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        redireccionarAutenticar: (datos) => ipcRenderer.send('redireccionarAutenticar', datos)
        ,
        redireccionarProductos: (datos) => ipcRenderer.send('redireccionarProductos', datos)
        ,
        redireccionarProducto: (datos) => ipcRenderer.send('redireccionarProducto', datos)
        ,
        redireccionarPedido: (datos) => ipcRenderer.send('redireccionarPedido', datos)
        ,
        buscarUsuario: (datos) => ipcRenderer.send('buscarUsuario', datos)
        ,
        retornarUsuario: (callback) => ipcRenderer.on('retornarUsuario', callback)
        ,
        buscarProductos: (datos) => ipcRenderer.send('buscarProductos', datos)
        ,
        retornarProductos: (callback) => ipcRenderer.on('retornarProductos', callback)
        ,
        buscarProducto: (datos) => ipcRenderer.send('buscarProducto', datos)
        ,
        retornarProducto: (callback) => ipcRenderer.on('retornarProducto', callback)
        ,
        buscarProveedor: (datos) => ipcRenderer.send('buscarProveedor', datos)
        ,
        retornarProveedor: (callback) => ipcRenderer.on('retornarProveedor', callback)
        ,
        actualizarProducto: (datos) => ipcRenderer.send('actualizarProducto', datos)
        ,
        realizarPedido: (datos) => ipcRenderer.send('realizarPedido', datos)
    }
)