const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=46c02c2e0ddcb4f4eeac793895fd764f&query=' + latitude + ',' + longitude +'&units=f'
    console.log(url)
    request({url: url, json:true}, (error, response) =>{

            if(error){
                callback('Unable to find weather', undefined)
            } else if(response.body.error){
                callback(response.body.error.info, undefined)
            } else{

                callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature
                + ' It feels like it is ' + 
                response.body.current.feelslike)

            }

            
        
        })


}


module.exports = forecast