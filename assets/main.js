let city=""; 
let url="";
let APIkey="";
let queryURL ="";
let newURL = "";
let citiesDiv = document.getElementById("searched-cities");
let cities = []; 
initialize(); 
listFunction(); 
searchFunction(); 


function initialize(){
    let saved_cities = JSON.parse(localStorage.getItem("cities"));
    if (saved_cities !== null){
        cities = saved_cities
    }   
    
    
   rendernewButtons(); 
}

function storeCities(){
    localStorage.setItem("cities", JSON.stringify(cities)); 
}

function rendernewButtons(){
    citiesDiv.innerHTML = ""; 
    if(cities == null){
        return;
    }
    let newCities = [...new Set(cities)];
    for(let i=0; i < newCities.length; i++){
        let cityName = newCities[i]; 

        let newButton = document.createElement("button");
        newButton.textContent = cityName; 
        newButton.setAttribute("class", "list-button"); 

        citiesDiv.appendChild(newButton);
        listFunction();
      }
    }

function listFunction(){
$(".list-button").on("click", function(event){
    event.preventDefault();
    city = $(this).text().trim();
    dualCalls(); 
})
}

function searchFunction() {
$("#search-button").on("click", function(event){
    event.preventDefault();
    city = $(this).prev().val().trim()
    
    cities.push(city);
    if(cities.length > 8){
        cities.shift()
    }
    if (city == ""){
        return; 
    }
    dualCalls();
    storeCities(); 
   rendernewButtons();
})
}

function dualCalls(){
    
    url = "https://api.openweathermap.org/data/2.5/forecast?q=";    
    newURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    APIkey = "&appid=7c5ff53a72bccf11a9b6c285cf436a47";
 queryURL = url + city + APIkey;
    current_weather_url = newURL + city + APIkey; 
    
    $("#city-name").text("Today's Weather in " + city);
    $.ajax({
        url: queryURL,
        method: "GET",
        
    }).then(function(response){
        
        let currentDay_number = 0; 
        
        for(let i=0; i< response.list.length; i++){
            if(response.list[i].dt_txt.split(" ")[1] == "15:00:00")
            {
                let currentDay = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                let currentMonth = response.list[i].dt_txt.split("-")[1];
                let currentYear = response.list[i].dt_txt.split("-")[0];
                $("#" + currentDay_number + "date").text(currentMonth + "/" + currentDay + "/" + currentYear); 
                let temp = Math.round(((response.list[i].main.temp - 273.15) *9/5+32));
                $("#" + currentDay_number + "forecast-temp").text("Temp: " + temp + String.fromCharCode(176)+"F");
                $("#" + currentDay_number + "forecast-humidity").text("Humidity: " + response.list[i].main.humidity);
                $("#" + currentDay_number + "forecast-wind").text("Wind Speed : " + response.list[i].wind.speed);
                $("#" + currentDay_number + "forecast-icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                currentDay_number++; 
                        }   
        }
    });

     $.ajax({
         url:current_weather_url,
         method: "GET", 
     }).then(function(current_data){
         let temp = Math.round(((current_data.main.temp - 273.15) * 9/5 + 32))
         $("#current-temp").text("Temperature: " + temp + String.fromCharCode(176)+"F");
         $("#current-humidity").text("Humidity: " + current_data.main.humidity);
         $("#current-windspeed").text("Wind Speed: " + current_data.wind.speed);
         $("#icon-div").attr({"src": "http://openweathermap.org/img/w/" + current_data.weather[0].icon + ".png",
          "height": "150px", "width":"150px"});
        })
        //get UV Index
    }

    // var uvURL = url + city + APIkey;
    // current_weather_url = newURL + city + APIkey; 
    // $.ajax({
    //     url: uvURL,
    //     method: "GET"
    // }).then(function (uvresponse) {
    //     var uvindex = uvresponse.value;
    //     var bgcolor;
    //     if (uvindex <= 3) {
    //         bgcolor = "green";
    //     }
    //     else if (uvindex >= 3 || uvindex <= 6) {
    //         bgcolor = "yellow";
    //     }
    //     else if (uvindex >= 6 || uvindex <= 8) {
    //         bgcolor = "orange";
    //     }
    //     else {
    //         bgcolor = "red";
    //     }
    //     var uvdisp = $("#current-uv").attr("class", "card-text").text("UV Index: ");
    //     console.log(uvdisp);
        
    
    // });


