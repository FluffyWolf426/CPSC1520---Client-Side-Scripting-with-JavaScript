/*
Fetch Fundamentals
In this example we're going to get the top news stories from 
1. Select all stories and get stories button.
  - Add an event listener on the button that will load the stories
  (function for this cretaed below.)
2. Create a function that will load all of the story ids.
  - you'll use the fetch api on the top stories endpoint to do this.
  - Documentation for top stories api endpoint https://github.com/HackerNews/API#new-top-and-best-stories
3. Create a function that will fetch the story data using the id and
  display is on the page.
  - you'll use the fetch api on the items end point to do this.
  - Documentation for items api endpoint https://github.com/HackerNews/API#items
  - The HTML 
  <a href="URL HERE" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">TITLE HERE</h5>
    <small>STORY SCORE HERE</small>
    </div>
    <p class="mb-1">TIMESTAMP HERE </p>
    <small>AUTHOR HERE</small>
  </a>
4. Create a function that will convert the date into something readable
  rather than a timestamp.
*/

// get the elements.
let getStoriesButton = document.querySelector(".fetch-stories")
let allStoriesElement = document.querySelector(".hn-stories")

// get all of the story ids.
const loadStories = () => {
  // set the url of the top stories from hackernews.
  const TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json"
  // we need to make the fetch request.
  fetch(TOP_STORIES_URL, {method: "GET"})
    .then((response)=> {
      return response.json()
    })
    .then((topStoryIds)=> {
      // we're going to handle/do something with the data here.
      console.log("Successfully fetched ")
      console.log(topStoryIds)
      // we're going to get the top ten story ids.
      let topTenStoryIds = topStoryIds.slice(0, 10)
      // loop through each story and fetch it.
      topTenStoryIds.forEach((id)=> {
        getAddRenderStory(id)
      })
    })
}

const getAddRenderStory = (id) => {
  // fetch story based on the id.
  const STORY_URL = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  console.log(STORY_URL)
  fetch(STORY_URL, {method: "GET"})
    .then((response)=> {
      return response.json()
    })
    .then((storyData)=> {
      console.log(`data for story id ${id}`)
      console.log(storyData)
      // render it on the page.
      allStoriesElement.innerHTML += `
      <a href="${storyData.url}" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${storyData.title}</h5>
        <small>${storyData.score}</small>
        </div>
        <p class="mb-1">${getReadableDate(storyData.time)} </p>
        <small>${storyData.by}</small>
      </a>
      `
    })
}

// let's convert unix time stamp to a date
const getReadableDate = (unixTimeValue) => {
  return new Date(unixTimeValue* 1000)
}



// make an event listener that's going to listen to "clicks" on getStoriesButton
getStoriesButton.addEventListener("click", ()=> {
  console.log("event listener is clicked")
  // call load stories.
  loadStories()

})