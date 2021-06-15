const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b89086e87aa466bf11e8abeb220b211c&query='+longitude+','+latitude+'&units=f'

    request({url, json:true}, (error, {body})=>{

        if(error){
            callback('Unable to connect to service',undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+', it is currently ' + body.current.temperature + ' degrees out it feels like ' + body.current.feelslike)

        }

    })
}

module.exports = forecast