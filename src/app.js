const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express Config
app.set('view engine','hbs')
app.use(express.static(path.join(__dirname, '../public')))

//set up handlebars engine and views location
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vikram Sudhagar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vikram'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vikram Sudhagar'

    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    } else{

        geocode(req.query.address, (error, data)=>{

            if(error){
                return res.send({
                    error
                })
            }
        
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error})
                }
        
            console.log(data.location)
            console.log(forecastData)

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })

        })
    })

    }

    
})

app.get('/products', (req, res)=> {

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found', {
        title:'404',
        errorMessage: 'Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikram',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')

})

