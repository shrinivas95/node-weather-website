const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Shrinivas'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Shrinivas'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText : 'This is some helpful text',
        title: 'Help',
        name : 'Shrinivas'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({ error })
        }

        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast: 'Its sunny here',
    //     location : 'Jamkhandi',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Shrinivas',
        errorMessage : 'Help Article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        title : '404',
        name : 'Shrinivas',
        errorMessage : 'Page not Found'

    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})