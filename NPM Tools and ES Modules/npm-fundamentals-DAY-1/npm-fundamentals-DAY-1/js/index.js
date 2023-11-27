// this is our main file because we've imported it in our html.

// a common pattern is to import your
// css at the entry point of your application
import 'bootstrap/dist/css/bootstrap.min.css';

// import my own stuff.
import { renderFoodTimesChart } from './food-times-chart';

const foodTimesChartElement = document.querySelector("#food-times-chart")

renderFoodTimesChart(foodTimesChartElement)