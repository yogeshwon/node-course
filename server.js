
const express = require('express');
const hbs = require('hbs'); 
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials')

app.set ('view engine', 'hbs');

  
app.use( (req, res , next) => {
    var now = new Date().toString(); 
   var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n' );
    next();
});  


// app.use((req, res, next) => {
//     res.render('maintence.hbs');
// })
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
//    res.send("<h1>Hello Aishvi</h1>");
res.render('home.hbs',
{
    pageTitle : "Home Page",
    welcomeMessage: "Welcome to My Website"

});
});

app.get('/about', (req, res) => {
    res.render("about.hbs", {
        pageTitle: 'About Page'
    });
});


app.listen(2112, () => {
    console.log("Server is up and port 2112");
});