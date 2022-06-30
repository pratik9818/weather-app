var fetchweather = '/weather'

const weatherform = document.querySelector('form')
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i")
const weatherCondition = document.querySelector(".weatherCondition")
const temElement = document.querySelector(".temperature span")
const locationElement = document.querySelector(".place")
const dateElement = document.querySelector(".date")

monthnames = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];


dateElement.textContent = new Date().getDate()+ "," + monthnames[new Date().getMonth()].substring(0,3)


weatherform.addEventListener('submit',(event)=>{
event.preventDefault();
locationElement.textContent = "loading"
weatherCondition.textContent = "";
temElement.textContent = "";

const locationApi = fetchweather +'?address='+ search.value

fetch(locationApi).then(response=>{
    response.json().then(data=>{
        if(data.error){
            locationElement.textContent = data.error
            weatherCondition.textContent = "";
            temElement.textContent = "";
        }else{
            if(data.description==="rain"|| data.description==="fog"){
                weatherIcon.className = 'wi wi-day'+ data.description
            }else{
                weatherIcon.className ='wi wi-day-cloudy'
            }
            locationElement.textContent = data.cityname
            weatherCondition.textContent = data.description.toUpperCase()
            temElement.textContent = (data.temperature - 276.5).toFixed(2) + String.fromCharCode(176)
        }
    })
})
})