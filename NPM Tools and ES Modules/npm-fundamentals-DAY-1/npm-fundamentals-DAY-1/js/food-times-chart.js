// import our chart.js package.
import Chart from 'chart.js/auto';

// import our functions via named imports in our project
import { getFoodTimesKeys, getFoodTimesValues }
  from './food.js'

const renderFoodTimesChart = (element) => {
  // build the arguments to our chart.
  const data = {
    labels: getFoodTimesKeys(),
    datasets: [{
      label: 'When Dan thinks about food.',
      data: getFoodTimesValues(),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }
  const config = {
    type: 'line',
    data: data,
  }
  // display the arguments
  console.log(config)
  
  // display my chart
  new Chart(element, config)
}

// export this function.
export {renderFoodTimesChart}


