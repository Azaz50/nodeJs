import express from 'express';
const app = express();
app.set('view engine', 'ejs');
//form form submission need this meddleware
app.use(express.urlencoded({extended: false}));
//static file ko batane k liye ye use krna hoga
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send("<h1>Home Page.</h1>");
});

// app.get('/about', (req, res) => {
//     let items = ['Apple', 'Banana', 'Cherry'];

//     res.render("about", {
//         title: 'About Page', 
//         message: "Welcome to Ejs!",
//         items: items
//     });
// });

app.get('/about', (req, res) => {
    res.render('form', {message: null});
});

app.post('/submit', (req, res) => {
    const name = req.body.myname;

    const message = `Hello, ${name} You Submitted form`;
    res.render('form', {message: message});
})

app.listen(8000, ()=> {
    console.log("server started successfully on port: 8000");
})