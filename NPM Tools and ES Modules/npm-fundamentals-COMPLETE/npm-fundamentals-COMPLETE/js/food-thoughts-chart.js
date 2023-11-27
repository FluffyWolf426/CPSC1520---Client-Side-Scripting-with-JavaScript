// import our chart.js package.
import Chart from 'chart.js/auto';

// import our own functions here
import { getFoodThoughtKeys, getFoodThoughtsValues } from './food';

// render our food thoughts chart.
const renderFoodThoughtsChart = (element) => {
  // set up the data
  const data = {
    labels: getFoodThoughtKeys(),
    datasets: [{
      label: 'Dans Thoughts about food.',
      data: getFoodThoughtsValues(),
      backgroundColor: [
        'red',
        'green',
        'blue',
        'yellow',
        'orange',
        'cyan',
        'purple',
        'aquamarine'
      ],
      hoverOffset: 4
    }]
  };
  // set up the config
  const config = {
    type: 'doughnut',
    data: data,
  };
  // use chart.js to render our chart at the element given.
  new Chart(element, config)
}

// export so that I can use it in my index.js
export {renderFoodThoughtsChart}
