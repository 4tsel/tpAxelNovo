const dataBase = require(`../db.js`)
const autosController = {
    index: (req, res)=>{
        let autos = [];
        for (i = 0; i<dataBase.length; i++){
            for(x in dataBase[i].autos){
            autos.push(`${dataBase[i].autos[x].marca} ${dataBase[i].autos[x].modelo} ${dataBase[i].autos[x].anio} ${dataBase[i].autos[x].color}`)
            }
        }
        let autosContados = autos.length
        autos = autos.sort()
        autos = autos.join(`<br>`)
        res.send(`<html>
                    <head>
                        <meta charset="UTF-8">
                        <title>DH - AUTOS</title>
                    </head>
                    <body style="text-align:center">
                        <h1 style="text-decoration:underline">Todos nuestros autos</h1>
                        <p>Actualmente contamos con ${autosContados} autos.</p>
                        <h2>Listado</h2>
                        <p>${autos.toUpperCase()}</p>
                    </body>
                </html>`)
    },
    marca: (req, res)=>{
        let idMarca = req.params.marca
        let idDato = req.params.dato
        if(idDato != undefined){
            idDato = idDato.toLowerCase()
        }
        let autos = [];
        dataBase.forEach(dato=>{
            autos.push(dato.autos)
        })
        let autosFiltrados = []
        for(i=0;i<autos.length;i++){
            for(var x in autos[i]){
                if(autos[i][x].marca == idMarca.toLowerCase()){
                    if(autos[i][x].anio == idDato){
                        autosFiltrados.push(`${autos[i][x].modelo} ${autos[i][x].color}<br>`)
                    }else if(autos[i][x].color == idDato){
                        autosFiltrados.push(`${autos[i][x].modelo} ${autos[i][x].anio}<br>`)
                    }else if(autos[i][x].modelo == idDato){
                        autosFiltrados.push(`${autos[i][x].modelo} ${autos[i][x].anio} ${autos[i][x].color}<br>`)
                    }else if(idDato == undefined){
                        autosFiltrados.push(`${autos[i][x].marca} ${autos[i][x].modelo} ${autos[i][x].anio} ${autos[i][x].color}<br>`)
                    }
                }
            }
        }
        autosFiltrados = autosFiltrados.sort()
        let contador;
        contador = autosFiltrados.length
        autosFiltrados = autosFiltrados.join(`<br>`)
        autosFiltrados = autosFiltrados.toUpperCase()
        if(idDato == undefined){
            idDato = `MOSTRANDO AUTOS DE LA MARCA ${idMarca.toUpperCase()}`
        }else{
            idDato = `PALABRA CLAVE: ${idDato.toUpperCase()}`
        }
        if(autosFiltrados.length < 1){
            res.send(`<html>
                        <head>
                            <meta charset="UTF-8">
                            <title>ERROR!</title>
                        </head>
                        <body style="text-align:center">
                            <h1 style="text-decoration:underline">Lo sentimos!</h1>
                            <h2></h2>
                            <p>No encontramos la marca/característica ingresada.
                            <br>
                            <br>
                            <a style="color: black" href="http://localhost:3030/autos/">VOLVER AL LISTADO<a></p>
                        </body>
                    </html>`)
        }else{
            res.send(`<html>
                        <head>
                            <meta charset="UTF-8">
                            <title>DH - ${idMarca.toUpperCase()}</title>
                        </head>
                        <body style="text-align:center">
                            <h1 style="text-decoration:underline">MARCA ${idMarca.toUpperCase()}</h1>
                            <p>${idDato}</p>
                            <h2 style="text-decoration:underline">LISTADO</h2>
                            <p>${autosFiltrados}
                            <br>
                            <br>
                            Contamos con ${contador} auto/s con la marca/característica ingresada.</p>
                        </body>
                    </html>`)
        }
    }
}

module.exports = autosController;