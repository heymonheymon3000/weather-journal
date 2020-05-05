/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=3214852bcf51b63cd1a44bc8d045383c';
const units = '&units=imperial';

const init = () =>{
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', fetchWeatherData);
}

const fetchWeatherData = () =>{
    const zip = document.getElementById('zip').value;
    const url = baseUrl+zip+apiKey+units;

    getWeatherDataByZip(url)
    .then(function(data) {
        let d = new Date(data.dt * 1000);
        let date_str = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
        const userResponse = document.getElementById('feelings').value;

        postWeatherData('http://localhost:8000/add', {
            temperature: data.main.temp, 
            date: date_str, 
            userResponse: userResponse
        });
    })
    .then(function(){
        return getAllWeatherData('http://localhost:8000/all');
    })
    .then(function(data){
        updateUI(data);
    });
}

const getWeatherDataByZip = async (url= '') => {
    const response = await fetch(url);

    try {
        const weatherData = await response.json();
        return weatherData;
    } catch(error) {
        console.log("error", error);
    }
}

const postWeatherData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    };
};

const getAllWeatherData = async (url = '') => {
    const response = await fetch(url);

    try {
        const weatherData = await response.json();
        return weatherData;
    } catch(error) {
        console.log('error', error);
    };
};

const updateUI = (data) => {
    if(data != null) {
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temperature;
        document.getElementById('content').innerHTML = data.userResponse;
    }
};

window.addEventListener("DOMContentLoaded", init);