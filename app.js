//first: we want to get the user api when the window loaded
//we use ipify.org's free api to do that

let IP;
let longitude;
let latitude;

let cityName = document.getElementById('cityName');
let weatherTemperature = document.getElementById('weatherTemperature');
let weatherDescription = document.getElementById('weatherDerscription');
let weatherIcon = document.getElementById('weatherIcon');




window.addEventListener('load',getIP);

function getIP(){
    fetch('https://api.ipify.org?format=json')
    .then(result=>result.json())
    .then(data=>{
        IP=data.ip;
    })
    .then(()=>console.log(IP))
    .then(getInformationFromIP);
    //this function (getInformationFromIP) uses another api to get more infortion, more than IP
}

function getInformationFromIP(){
    let userKey="950c659e13b147b2bed0998044580fe4";
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${userKey}&ip=${IP}`)
    .then(result=>result.json())
    .then((data)=>{
        console.log(data);
        cityName.innerHTML=data.city;
        longitude=data.longitude;
        latitude=data.latitude;
    })
    .then(getWeather)
    //this is a new function and maybe our last one, it get's weather information by long and latitude
}

function getWeather(){
    let userkey="6ed64f29fd07524677399733688710d7";
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${userkey}`)
    .then(result=>result.json())
    .then((data)=>{
        console.log(data);
        weatherTemperature.innerHTML=data.main.temp+"℃";
        weatherDescription.innerHTML=data.weather[0].description;
        weatherIcon.innerHTML=`<img src="Images/${data.weather[0].icon}.png">`;
    })
}


//this func do searching by the city name


function searchAndShowCityWeather(){
    let searchedcity = document.getElementById('citySearchInput').value;
    console.log(searchedcity);
    let userKey = "6ed64f29fd07524677399733688710d7";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedcity}&units=metric&appid=6ed64f29fd07524677399733688710d7`)
    .then(result=>result.json())
    .then((data)=>{
        if(data.message=="city not found" || searchedcity=="")
        {
            alert("invalid city name")
            getInformationFromIP();
        }
        console.log(data);
        cityName.innerHTML=data.name;
        weatherTemperature.innerHTML=data.main.temp+"℃";
        weatherDescription.innerHTML=data.weather[0].description;
        weatherIcon.innerHTML=`<img src="Images/${data.weather[0].icon}.png">`;
    })
}