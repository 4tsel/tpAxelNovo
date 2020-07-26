const fs = require(`fs`);
const dataBase = require("../db");
const marcasController = {
    index: (req, res) =>{
        let marcas = [];
        for(i=0; i<dataBase.length; i++){
            for(x in dataBase[i].autos){
                marcas.push(`<a style="color:black" href="http://localhost:3030/marcas/${dataBase[i].autos[x].marca}">${dataBase[i].autos[x].marca.toUpperCase()}<br></a>`);
            }
        }
        let marcasFiltradas = [];
        marcas.forEach(dato=>{
            if(marcasFiltradas.indexOf(dato) == -1){
                marcasFiltradas.push(dato)
            }
        })
        let marcasContadas = marcasFiltradas.length
        marcasFiltradas = marcasFiltradas.sort()
        marcasFiltradas = marcasFiltradas.join(`<br>`)
        res.send(`<html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Marcas</title>
                    </head>
                    <body style="text-align:center">
                        <h1 style="text-decoration:underline">Nuestras marcas</h1>
                        <p>${marcasFiltradas}</p>
                        <h2>Contamos con ${marcas.length} autos de ${marcasContadas} marcas!!! </h2>
                    </body>
                </html>`)
    },
    marca: (req,res)=>{
        let idMarca = req.params.marca
        idMarca = idMarca.toLowerCase()
        let autos = [];
        dataBase.forEach(dato=>{
            autos.push(dato.autos)
        })
        let autosPorMarca = [];
        for(i=0;i<autos.length;i++){
            for(x in autos[i]){
                if(autos[i][x].marca == idMarca){
                    autosPorMarca.push(`${autos[i][x].marca.toUpperCase()} ${autos[i][x].modelo.toUpperCase()} ${autos[i][x].anio} ${autos[i][x].color.toUpperCase()}<br>`)
                }
            }
        }
        autosPorMarca = autosPorMarca.sort()
        let autosContados = autosPorMarca.length
        autosPorMarca = autosPorMarca.join(`<br>`)
        if(autosPorMarca.length > 0){
            res.send(`<html>
                        <head>
                            <meta charset="UTF-8">
                            <title>Marcas - ${idMarca.toUpperCase()}</title>
                        </head>
                        <body style="text-align:center">
                            <h1 style="text-decoration:underline">AUTOS ${idMarca.toUpperCase()}</h1>
                            <p>Contamos con ${autosContados} auto/s de la marca ingresada</p>
                            <h2 style="text-decoration:underline">Listado</h2>
                            <p>${autosPorMarca}</p>
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
                            <p>La marca ingresada no se encuentra en nuestra base de datos.
                            <br>
                            <br>
                            <a style="color:black" href="http://localhost:3030/marcas">VOLVER AL LISTADO</a></p>
                        </body>
                    </html>`)
        }
    }
}

module.exports = marcasController;