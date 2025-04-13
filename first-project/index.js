const express = require('express');
const app = express();


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

app.listen(8000, ()=> {
    console.log("the port is listening on 8000");
})