require("dotenv").config();
const exp = require('express');
require("./config");
const User = require('./user');
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = exp();
let cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");
app.set('view engine', 'ejs');
app.use(bodyParser.json())

app.get('/', (_, resp) => {
	resp.render('registration'); 
});
app.get('/login', (req, resp) => {
	resp.render('login');
});

// app.use(exp.json());
app.use(cookieParser());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post("/login", urlencodedParser, async (req, res) => {
	console.log(req.body);
	const { username, password: plainTextPassword } = req.body
	const user = await User.findOne({ username }).lean()
	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(plainTextPassword, user.password)) {
		// the username, password combination is successful
		const token = jwt.sign(
			{
				user_id: user._id,
				username: user.username
			},
			process.env.JWT_SECRET
		)
		res.cookie('jwt',token)
		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })

});

app.post("/register", urlencodedParser, async (req, res) => {
	console.log(req.body);
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username: username,
			password: password,
		});
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}
	return res.redirect('/login');
});
app.use((req, res, next) => {
	req.headers['x-access-token'] = req.cookies.jwt;
    next();
});
app.get('/profile',auth, (_, resp) => {
	resp.send("<h1>Home Page by </h1>");  
});
app.listen(5000);