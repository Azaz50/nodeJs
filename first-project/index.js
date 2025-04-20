const express = require('express');
const app = express();

//npm install ejs then set here view engine for ejs
app.set('view engine', 'ejs');
//when databases send a request to the server as a json then use it.
app.use(express.json());
//if you want to use form data then use this
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.send("hello azaz");
});

app.get('/about', (req, res) => {
    res.send("<h1>This is about page</h1>")
});
app.get('/about/user', (req, res) => {
    res.send("<h1>This is user page</h1>")
});

app.get('/about/:id', (req, res) => {
    res.send(req.params);
});

app.get('/user/:userid/book/:bookid', (req, res) => {
    res.send(req.params);
});

app.get('/user/:userid/book/:bookid', (req, res) => {
    res.send("Book id: " + req.params.bookid);
});

app.get('/search', (req, res) => {
    res.send(req.query);
})

app.get('/search', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;

    res.send(`Search results for Name: ${name}, Age: ${age}`);
})

app.get('/', (req, res) => {
    const users = [
        {id: 1, name: 'salman'},
        {id: 2, name: 'Azaz'},
    ]
    res.json(users);
});

app.get('/user', (req, res) => {
    res.render('user');
});

app.get('/download', (req, res) => {
    res.download('./files/42 Astaghfar.pdf', 'Astaghfar.pdf');
});

app.get('/download-file', (req, res) => {
    res.sendFile(__dirname + '/files/42 Astaghfar.pdf');
});

app.get('/end', (req, res) => {
    res.write("This is testing");
    res.end();
});

app.get('/status', (req, res) => {
    res.sendStatus(200);
});

app.get('/check', (req, res) => {
    res.status(200).send("hello done");
});

app.get('/check2', (req, res) => {
    res.set('custom-header', 'hello123');
    console.log(res.get('custom-header'));
    res.send("Header Set");
})

//Request send or properties

app.post('/about-us', (req, res) => {
    res.send(req.body);
})

app.listen(8000, ()=> {
    console.log("the port is listening on 8000");
})