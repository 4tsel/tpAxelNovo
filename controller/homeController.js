const fs = require(`fs`);
const dataBase = require(`../db`);
const homeController ={
    index: (req, res)=>{
        let sucursales = [];
        dataBase.forEach(dato =>{
            sucursales.push(`<a style="color:black" href="http://localhost:3030/sucursales/${dato.sucursal}">${dato.sucursal.toUpperCase()}<br></a>`)
        })
        sucursales = sucursales.sort()
        sucursales = sucursales.join(`<br>`)
        res.send(`<html>
                    <head>
                        <meta charset="UTF-8">
                        <title>DH AUTOMOTORES</title>
                    </head>
                    <body style="text-align:center">
                        <h1 style="text-decoration:underline">Digital House Automotores</h1>
                        <p>Bienvenido a nuestro sitio.</p>
                        <h2 style="text-decoration:underline">Nuestras sucursales</h2>
                        <p>${sucursales}</p>
                    </body>
                </html>`)
    },
    error: (req, res)=>{
        res.send(`<html>
                    <head>
                        <meta charset="UTF-8">
                        <title>UPS!</title>
                    </head>
                    <body style="text-align:center">
                        <h1 style="text-decoration:underline">Lo sentimos!</h1>
                        <p>La ruta especificada no existe</p>
                        <h2 style="text-decoration:underline"></h2>
                        <p>😫
                        <br>
                        <br>
                        <a style="color:black" href="http://localhost:3030/">🏠VOLVER AL HOME🏠</a></p>
                    </body>
                </html>`)
    }
}

module.exports = homeController;