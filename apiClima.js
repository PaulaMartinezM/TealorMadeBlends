let urlClima = 'https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,ar&APPID=85a8a1e5e206d3e52cefd482ffc317b9';

fetch(urlClima)
.then((clima)=>clima.json())
.then((climaDia)=>{showWeather(climaDia)});

function showWeather(climaDia){
    let nodo2 = document.querySelector("#weather");
    nodo2.setAttribute("style","margin:2rem");
    let div = document.createElement("div");
    let recomendacion="";
    let temperatureCelsius = parseInt(climaDia.main.temp - 273);
        if (temperatureCelsius>20){
            recomendacion="Está ideal para un Ice Tea 🥤 de Tealor Made o buenos tererés con nuestros mix para Yerba Mate.";
        }
        else{
            recomendacion="Está ideal para un Hot Tea 🍵 de Tealor Made o unos ricos matesitos con nuestros mix para Yerba Mate.";
        }
    div.innerHTML= `La temperatura 🌡 de hoy es: ${temperatureCelsius} °C. <br>
                    ${recomendacion}`
    console.log(climaDia.main.temp);
    console.log(parseInt(temperatureCelsius));
    nodo2.appendChild(div);
    }