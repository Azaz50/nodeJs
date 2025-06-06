const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user.model');

//Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/user-crud')
.then(() => console.log('Connected!'));

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.use(session({
	secret: 'secret123',
	resave: false,
	saveUninitialized: false
}));

let checklogin = (req, res, next) => {
	if(req.session.user){
		next()
	}else {
		res.redirect('login')
	}
}

//Routes
app.get('/', checklogin, (req, res) => {
	res.send(`<h1>Home Page</h1>
		<p>Hello, ${req.session.user}</p>
		<a href="/logout">Logout</a>`);
});

app.get('/profile', checklogin, (req, res) => {
	res.send(`<h1>profile Page</h1>
		<p>Hello, ${req.session.user}</p>
		<a href="/logout">Logout</a>
`);
});


app.get('/login', (req, res) => {
	if (req.session.user) {
		res.redirect('/')
	}else{
		res.render('login', {error: null});

	}
});

app.get('/register', (req, res) => {
	res.render('register', {error: null});
});

app.post('/register', async (req, res) => {
	const {username, userpassword} = req.body;
	const hasedPassword = await bcrypt.hash(userpassword, 10);

	// res.send({username, userpassword: hasedPassword});
	await User.create({username, userpassword: hasedPassword});
	res.redirect('/login');
})


app.post('/login', async (req, res) => {
	const {username, userpassword} = req.body;

	const user = await User.findOne({username});
	if(!user) return res.render('login', {error: 'User not found!'});

	const isMatch = await bcrypt.compare(userpassword, user.userpassword)
	if(!isMatch) return res.render('login', {error: 'Invalid Password'});

	req.session.user = username;
	res.redirect('/')
})

app.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/login');
	})
})

app.listen(8000, () => {
	console.log("server is running on port 8000");
})
