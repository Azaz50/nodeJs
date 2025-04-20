const express = require('express');
const app = express();


//Application level middleware
// const mymiddleware = (req, res, next) => {
// 	console.log("Hello from Middleware");
// 	console.log(`${req.method} ${req.url}`);
// 	const d = new Date();
// 	console.log(`Date ${d.getDate()} / ${d.getMonth()}`)
// 	next();
// }

// app.get('/', (req, res) => {
// 	res.send("<h1>Home Page</h1>");
// });

// app.use(mymiddleware);


//Route-level middleware
// const router = express.Router();

// router.use((req, res, next) => {
// 	console.log("Router-level Middleware");
// 	next();
// })

// router.get('/', (req, res) => {
// 	res.send("<h1>Home Page</h1>");
// })

// router.get('/about', (req, res) => {
// 	res.send("<h1>About Page</h1>");
// });


// app.use('/test', router);

//Error Handling middleware



app.get('/', (req, res) => {
	res.send("<h1>Home Page</h1>");
})

app.get('/about', (req, res) => {
	res.send("<h1>About Page</h1>");
});

app.use((req, res) => {
	res.send("<h1>Error 404: Page not found</h1>");
})

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke");
	next();
})


app.listen('8000', (req, res) => {
	console.log("server is running on port 8000");
})