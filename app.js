const express = require('express');
const hbs = require('hbs');
var fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear;
})

hbs.registerHelper('message', (text) => {
    return text.toUppercase()
})

app.use((request, Response, next) => {
    // var time = new Date().toString();
    // // console.log(`${time}: ${request.method} ${request.url}`);
    // var log = `${time}:${request.method} ${request.url}`;
    // fs.appendFile('server.log', log + '\n', (error) => {
    //     if (error) {
    //         console.log('Unable to log message')
    //     }
    // });
    Response.render('use.hbs',{
        title:'About page'
    });
});

app.get('/',(Request, Response) => {
    Response.send({
        name: 'Your Name',
        school: [
            'BCIT',
            'SFU',
            'UBC'
        ]
    })
});

app.get('/info', (Request,Response) => {
    Response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear()
    });
});

app.get('/404', (request,Response) => {
    Response.send({
        error:'Page not found'
    })
})

app.listen(8080,()=>{
    console.log('Server is listening')
});