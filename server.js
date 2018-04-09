const express = require('express');
const hbs = require('hbs');
const fs=require('fs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {

    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});


var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//calling next() is necessary to let the application run.
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log');
        }

    });
    next();
}
);


// app.use( (req,res,next)=>{
// res.render('maintainance.hbs');
// }

// );

app.get('/', (request, response) => {
    //response.send('<h1> Hello Express!</h1>');
    response.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to under construction home page."
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page",
        aboutMessage: "This will tell about the things I am doing form past few weeks"
    }

    );
}
);

app.get('/bad', (req, res) => {
    res.send(
        {
            errorCode: 404,
            errorMessage: "Not found"
        }

    )
});

app.listen(3000, () => {
    console.log('Server is up on port:3000')
}
);
