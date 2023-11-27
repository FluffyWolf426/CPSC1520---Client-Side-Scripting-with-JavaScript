// the variable below is essentially the 
// domain of the backend.
const BASE_URL = "http://localhost:3000"

const getReviews = async () => {
  // we're making a request to the backend.
  const response = await fetch(`${BASE_URL}/posts?_sort=score&_order=desc`)
  // extract the json from the response
  const data = await response.json()
  // return the data form this api/from this function.
  return data
}

// post to the backend
const postReview = async ({title, url}) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST", // the method of the request.
    headers: { // tell the backend we're sending json.
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ // we need to send json as the body.
      title: title,
      url: url,
      score: 0
    })
  })
  // parse the response
  const data = await response.json()
  // return the data.
  return data
}

// export this function fomr the file.
export {getReviews, postReview}
