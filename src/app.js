const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rashi'
    });
});

app.get('/help', (req,res) => {
    res.render('help' , {
        helpGuide: ' For any queries , contact weather@info.com',
        title: 'Help Page',
        name: 'Rashi'
    })
});

app.get('/about', (req,res) => {
    res.render('about' , {
        title: 'About Me!',
        name: 'Rashi'
    })
});

app.get('/weather' , (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide a valid address'
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, placeName} = {}) => {
        if(error)
        res.send({
            error: error
        })
        else
        forecast(latitude, longitude, (error, response) => {
            if(error)
            res.send({
                error
            })
            else
            {
                res.send({
                    response,
                    location: placeName,
                    address: req.query.address
                }); 
            }
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Rashi',
        errorText: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Rashi',
        errorText: 'Page not found'
    });
});

// Set up the port
app.listen(3000, () => {
    console.log('Server is up and listening.');
});