const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', async (req, res) => {
    res.render('mejoras', { title: 'Mejoras' });
});

router.post('/insertMejora', async (req, res) => {
    res.redirect('../db');
    var usuario = req.body.usuario;
    var mejora = req.body.mejora;
    var hoy = new Date();
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var fecha = hoy.getDate() + ' de ' + meses[hoy.getMonth()]  + ' de ' + hoy.getFullYear();
    if (usuario && mejora) {
        try {

            const client = await pool.connect();
            const result = await pool.query("INSERT INTO tabla_mejoras values ('" + usuario + "', '" + mejora + "', '" + fecha + "')");
            res.status(204).send();
            client.release();

        } catch (err) {
            console.error(err);
            res.send('Error ' + err);
        }
    }
});


module.exports = router;