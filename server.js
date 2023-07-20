const express = require('express');

const app = express();

const port = process.env.PORT||3000
const https = require('https')

const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({extended:true}))
app.set(('views'),path.join(__dirname,"./views"))
app.set('view engine',"ejs")
app.get('/',(req,res)=>{
res.render('index')
})

app.post('/',(req,res)=>{
   try {
    const querry = req.body.Cityname;
    const apikey = 'a148b0ae7c3c08212faf1fdb27d256b7';
            const url = 'https://api.openweathermap.org/data/2.5/weather?q='+querry+'&appid='+apikey+'&units=metric';
         
            
            https.get(url,(response)=>{
               // console.log(res.statusCode)
               response.on('data', (data)=>{
                  const weatherdata = JSON.parse(data);
                  const temp = weatherdata.main.temp;
             
                   const description = weatherdata.weather[0].description;
                  res.send(`<h1 style="font-size: 24px; color: #333;  text-align: center; margin-top:15rem; ">The Temp Of This City Is ${temp}</h1>
                  <p style="font-size: 18px; color: #666; text-align: center; margin-top:5rem;">And The Condition Of This City Is ${description}</p>`)
             
                   });
      
        });
    
    } catch (error) {
        console.log(error)
    }
    
})


app.listen(port,(req,res)=>{
    console.log(`server is running on http://localhost:${port}`)
})
