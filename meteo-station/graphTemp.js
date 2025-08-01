const cityButton = document.getElementById('cityButton')
const graphTemperature = document.getElementById('graphTemperature')
let temperatureGraph

cityButton.addEventListener('click', function () {
const hoursLabels = ['heure1','heure2','heure3','heure4','heure5','heure6','heure7','heure8','heure9','heure10','heure11','heure12','heure13','heure14','heure15',]
const data = {
  labels: hoursLabels,
  datasets: [
    {
      label: ['température'],
      data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      borderColor: '#00FF00',
    }]
}

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'température sur les derniers jours'
      }
    }
  },
}

   temperatureGraph = new Chart(graphTemperature, config)
})

export async function updateChartWithData(latGiven, LonGiven){

    const graphData = new Array(15).fill(0)
    const graphHours = new Array(15).fill('')
    
    try{
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latGiven}&longitude=${LonGiven}&hourly=temperature_2m,precipitation&past_days=2`)
    const answer = await response.json()

    for(let i = 0; i < 15; i++){
        graphData[i] = answer.hourly.temperature_2m[i + 13]
        graphHours[i] = answer.hourly.time[i + 13]
    }
        temperatureGraph.data.datasets[0].data = graphData
        hoursLabels = graphHours
    
    temperatureGraph.update()
    }

    catch{
        console.error("Problème de connexion avec l'API")
    }
}