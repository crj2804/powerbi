const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


let isLoggedIn = false;
let user;

app.use('/', (req, res, next) => {
	if (!isLoggedIn) {
		if (req.url.includes('login') || req.url.includes('static') || req.url.includes('user')) return next();
		return res.redirect('/login');
	}
	next();
});

app.use('/login', express.static('loginscreen'));
app.use('/', express.static('dashboard'));
app.use('/static', isLoggedIn ? express.static('dashboard/static') : express.static('loginscreen/static'));
app.use(bodyParser.json());

app.post('/user', (req, res) => {
	isLoggedIn = true;
	user = req.body;
	return res.redirect('/');
});

app.get('/logout', (req, res) => {
	isLoggedIn = false;
	user = undefined;
	return res.redirect('/login');
});

app.get('/user', (req, res) => res.json(user));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
