// this is our main file because we've imported it in our html.

// a common pattern is to import your
// css at the entry point of your application
import 'bootstrap/dist/css/bootstrap.min.css';

// import my own stuff.
import { renderFoodTimesChart } from './food-times-chart';
import { renderFoodThoughtsChart } from './food-thoughts-chart';

// select the canvas elements
const foodTimesChartElement = document.querySelector("#food-times-chart")
const foodThoughtsChartElement = document.querySelector("#food-thoughts-chart")

// use the function that we've created in another file.
renderFoodTimesChart(foodTimesChartElement)
renderFoodThoughtsChart(foodThoughtsChartElement)
