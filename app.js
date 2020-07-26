const express = require(`express`);
const app = express();

app.listen(3030, console.log(`Todo le sale bien a Milhouse en el puerto 3030!!!`));

const rutasHome = require(`./routes/home.js`);
const rutasSucursales = require(`./routes/sucursales.js`);
const rutasMarcas = require(`./routes/marcas.js`);
const rutasAutos = require(`./routes/autos.js`)


app.use(`/sucursales`, rutasSucursales);
app.use(`/marcas`, rutasMarcas);
app.use(`/autos`, rutasAutos)
app.use(`/`, rutasHome);

