const dataBase = require(`../db.js`)
const sucursalesController = {
    index: (req, res)=>{
        let sucursales = []
        dataBase.forEach(dato => {
            sucursales.push(`<a style="color:black" href="http://localhost:3030/sucursales/${dato.sucursal}">${dato.sucursal.toUpperCase()}</a>
                            <br>
                            <br>
                            DIRECCIÓN: ${dato.direccion}
                            <br>
                            TELÉFONO:${dato.telefono}
                            <br>`)
        });
        sucursales = sucursales.sort()
        sucursales = sucursales.join(`<br>`)
        res.send(`<html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Nuestras sucursales</title>
                    </head>
                    <body style="text-align:center">
                        <h1 style="text-decoration:underline">Nuestras Sucursales</h1>
                        <p>${sucursales}</p>
                    </body>
                </html>`)
    },
    sucursal: (req, res)=>{
        let idSucursal = req.params.sucursal;
        let sucursales = [];
        dataBase.forEach(dato=>{
            sucursales.push(`${dato.sucursal}`)
        })
        idSucursal = sucursales.findIndex(index => idSucursal.toLowerCase() === index.toLowerCase())
        if(idSucursal != -1){
            let autosPorSucursal = dataBase[idSucursal].autos
            let cantidadDeAutos = autosPorSucursal.length
            let detalleAutos = []
            autosPorSucursal = autosPorSucursal.forEach(dato=>{
                detalleAutos.push(`${dato.marca.toUpperCase()} ${dato.modelo.toUpperCase()} ${dato.anio} ${dato.color.toUpperCase()}`)
            })
            detalleAutos = detalleAutos.sort()
            detalleAutos = detalleAutos.join(`<br>`)
            sucursal = `${dataBase[idSucursal].direccion}<br>Teléfono: ${dataBase[idSucursal].telefono}`
            res.send(`<html>
                        <head>
                            <meta charset="UTF-8">
                            <title>Sucursal ${dataBase[idSucursal].sucursal}</title>
                        </head>
                        <body style="text-align:center">
                            <h1 style="text-decoration:underline">Bienvenido a la sucursal ${dataBase[idSucursal].sucursal}</h1>
                            <p>${sucursal}</p>
                            <h2 style="text-decoration:underline">Nuestros autos</h2>
                            <p>${detalleAutos}</p>
                            <p>TOTAL DE AUTOS: ${cantidadDeAutos}</p>
                        </body>
                    </html>`)
        }else{
            res.send(`<html>
                        <head>
                            <meta charset="UTF-8">
                            <title>ERROR!</title>
                        </head>
                        <body style="text-align:center">
                            <h1 style="text-decoration:underline">Lo sentimos!</h1>
                            <h2></h2>
                            <p>La sucursal seleccionada no existe en nuestra base de datos.
                            <br>
                            <br>
                            <a style="color:black"href="http://localhost:3030/sucursales">VOLVER AL LISTADO</a></p>
                        </body>
                    </html>`)
        }
    }
}

module.exports = sucursalesController;