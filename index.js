let fetchBtn = document.querySelector(".fetch");
let container = document.querySelector(".container");
let lat;
let lon;

navigator.geolocation.getCurrentPosition(function(position) {
    // Get the latitude and longitude from the position object
   lat = position.coords.latitude;
   lon = position.coords.longitude;
   console.log("lat ", lat)
   console.log("lon ", lon)

})
  
fetchBtn.addEventListener("click", (e)=>{
    container.style.height = "auto";
    container.innerHTML ="<h2>Weather Api</h2 >";
    
    let latlong = document.createElement("div");
    latlong.setAttribute("id", "latlong");
    let latLabel = document.createElement("label")
    latLabel.innerText = "Lat: "
    let latInput = document.createElement("input");
    latInput.setAttribute("type", "text");
    latInput.addEventListener("change",(e)=>{
        lat = parseInt(e.target.value);
        console.log(lat)
        document.getElementById("weather").innerHTML=''
        fetchData();
    })

    let long = document.createElement("label")
    long.innerText = "Long: "
    let longInput = document.createElement("input");
    longInput.setAttribute("type", "text");
    longInput.addEventListener("change", (e)=>{
        lon = parseInt(e.target.value)
        document.getElementById("weather").innerHTML=''
        fetchData();
    })

    latlong.appendChild(latLabel);
    latlong.appendChild(latInput)
    latlong.appendChild(long)
    latlong.appendChild(longInput)
    container.appendChild(latlong)
        
    fetchData();

   
})

function fetchData(){
    let mapdiv = document.createElement("div");
    mapdiv.setAttribute("id", "map");
    mapdiv.style.width = "500px";
    mapdiv.style.height = "300px";
    container.appendChild(mapdiv);
    let weatherdiv = document.createElement("div");
    weatherdiv.setAttribute("id", "weather" );
    weatherdiv.style.width = "500px";
    weatherdiv.style.height = "300px";
    container.appendChild(weatherdiv);

    
        
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lon },
        zoom: 11
      });

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=84192d2a1b7500c195c83b669c597550`)
      .then(response => response.json())
      .then(data => {
        // Parse the weather data and display it on the page
        const weatherElement = document.getElementById("weather");
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        console.log(data)
        const location = data.name;
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const timezone = data.timezone
        const windspeed = data.wind.speed;  
        const presure = data.main.pressure;
        const humidity = data.main.humidity;
        const winddirection = data.wind.deg;       
        const feelslike = data.main.feels_like;
        let p = document.createElement("p");
        p.style.fontSize = "24px";
        p.innerText = "Weather Data";
        p.style.fontWeight = "400"
        p.style.marginLeft = "50px"
        let wd = document.createElement("div")
        wd.setAttribute("id", "weather-data")
        weatherElement.style.backgroundColor = "white"
        weatherElement.style.color = "black"
        weatherElement.style.height = "420px"

        wd.innerHTML = `            Location: ${location}<br><br>
                                    Lat: ${lat} Lon: ${lon}<br><br>
                                    Time Zone: ${timezone}<br><br>
                                    Wind Speed: ${windspeed}m/s<br><br>
                                    Presure: ${presure}<br><br>
                                    Humidity: ${humidity}<br><br>
                                    Wind Direction: ${winddirection}<br><br>
                                    Feels Like: ${feelslike}`;
        weatherElement.appendChild(p);
        weatherElement.appendChild(wd);
      })
      .catch(error => {
        console.error(error);
      });

    
}
