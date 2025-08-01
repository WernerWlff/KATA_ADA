import { updateChartWithData } from "./graphTemp.js"

const city = document.getElementById('city')
const gps = document.getElementById('gps')
const temperature = document.getElementById('temperature')
const details = document.getElementById('details')
const cityButton = document.getElementById('cityButton')
const cityInput = document.getElementById('cityInput')
const detailsPrecipitation = document.getElementById('detailsPrecipitation')
const detailsHumidity = document.getElementById('detailsHumidity')

async function getWeatherCity(whichCity){

    try{
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${whichCity}&format=json&addressdetails=1&limit=1`) // on récupère déjà le json
    const answer = await response.json()
    const cityName = answer[0].name

    city.innerText = cityName
    await fetchCoordinates(cityName)
    details.innerText = 'Température actuelle'
    }
    
    catch{
        city.innerText = "Ville non trouvée"
        gps.innerText = "-"
        temperature.innerText = "-"
        details.innerText = "Vérifiez le nom de la ville"
    }
}

async function fetchCoordinates(whichCity){

    try{
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${whichCity}&format=json&addressdetails=1&limit=1`)
        const answer = await response.json()
        
        let cityLatitude = answer[0].lat
        let cityLongitude = answer[0].lon
        gps.innerText = `Coordonnées GPS: ${cityLatitude}, ${cityLongitude}`
        await fetchWeather(cityLatitude, cityLongitude)
        await updateChartWithData(cityLatitude, cityLongitude)
    }
    catch{
        console.error("Problème de connexion avec l'Api")
    }
}

async function fetchWeather(latGiven, lonGiven){

    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latGiven}&longitude=${lonGiven}&current=temperature_2m,precipitation,relative_humidity_2m`)
        const answer = await response.json()
        
        temperature.innerText = `${answer.current.temperature_2m}°C`
        if(answer.current.precipitation === 0 ){
            detailsPrecipitation.innerText = "Aucune precipitation"
        }

        else{
        detailsPrecipitation.innerText = `${answer.current.precipitation}mm de pluie`
        }
        detailsHumidity.innerText = `${answer.current.relative_humidity_2m}% d'humidité`
    }

    catch{
        console.error("Problème de connexion avec l'api")
    }
}

async function getCity(){
    let cityName = cityInput.value
    await getWeatherCity(cityName)
}

cityButton.addEventListener('click', getCity) // permet de lancer l'update de nos infos en fonction de la ville