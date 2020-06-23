const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
var knex = require('knex');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const app = express();
app.use(bodyParser.json());
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'id_5557600',
      database : 'smartbrain'
    }
});

app.get('/', (req,res) => { res.send(database.users); });

app.post('/signin', (req, res) => { signin.signin(req, res, db, bcrypt); });

app.get('/profile/:name', (req, res) => { profile.getProfile(req, res, db); });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.listen(9000, () => { console.log("App is Running on port 9000"); });