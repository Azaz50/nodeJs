const express = require('express');
const app = express();
const { body, validationResult } = require("express-validator");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


const validationRegistration = [
  body('firstName')
    .notEmpty().withMessage("First name is required")
    .isLength({ min: 3 }).withMessage("First name must be at least 3 characters long")
    .trim()
    .isAlpha().withMessage("Name must contain only letters")
    .custom(value => {
    	if (value === 'admin') {
    		throw new Error('username "admin" is not allowed')
    	}
    })

  body('lastName')
    .notEmpty().withMessage("Last name is required")
    .isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long")
    .trim()
    .isAlpha().withMessage("Name must contain only letters"),

  body('email')
    .isEmail().withMessage("Enter a valid email")
    .normalizeEmail(),

  body('password')
    .isLength({ min: 5, max: 10 }).withMessage("Password must be between 5 to 10 characters long")
    isStrongPassword().withMessage('Password must be strong'),
];



app.get('/myform', (req, res) => {
	res.render('myform');
});

app.post('/saveform',validationRegistration, (req, res) => {
	const error = validationResult(req)
	if (error.isEmpty()) {
		res.send(req.body);
	}
	res.send(req.body);
})


app.listen('8000', (req, res) => {
	console.log("server is running on port 8000");
})