const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Set up paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set up handlebars view engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve static files
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Shivam Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful text.',
        name : 'Shivam Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        name : 'Shivam Sharma'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error : 'You must provide an address.'})
    }

    geoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title : '404',
        name : 'Shivam Sharma',
        errorMessage : 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title : '404',
        name : 'Shivam Sharma',
        errorMessage : 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})

