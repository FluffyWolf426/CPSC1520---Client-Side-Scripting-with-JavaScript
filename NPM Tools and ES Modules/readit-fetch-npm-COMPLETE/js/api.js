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

// modify the score,
const patchScore = async ({id, score}) => {
  // the path is going to need the id.
  const PATCH_URL = `${BASE_URL}/posts/${id}`
  const response = await fetch(PATCH_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
      // if you'd would need to use authentication
      // you'd use a header here named "Authorization"
      // "Authorization": "<token-name> <token-value>"
      // example
      // "Authorization": "Bearer 5234623456341234134623452134"
    },
    body: JSON.stringify({
      score: score
    })
  })
  // parse the data
  const data = await response.json()

  return data
}

// export this function fomr the file.
export {getReviews, postReview, patchScore}
