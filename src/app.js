const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express();

const weatherdata = require('../utilis/weatherdata')

const port = process.env.port || 3000;

const publicstaticdirpath = path.join(__dirname, '../public')

const viewspath = path.join(__dirname, '../template/views')

const partialspath = path.join(__dirname, '../template/partials')


app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)
app.use(express.static(publicstaticdirpath))

app.get('', (req, res)=>{
    res.render('index',{
        title:"WEATHER APP"
    })
})



app.get('/weather', (req, res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:'you must enter address'
        })
    }
    weatherdata(address, (error,{temperature, description, cityname} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
console.log(temperature, description, cityname);
return res.send({
    temperature,
     description,
      cityname
})
    })
})


app.get('*', (req, res)=>{
    res.render('404',{
        title:'page not found'
    })
})


app.listen(port, ()=>{
console.log(`listing is up and running in on ${port}`);
})