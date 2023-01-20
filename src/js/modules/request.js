
/**
 *
 * @param {string} url //The first url of giving api
 */
async function GET (url) {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

/**
 *
 * @param {HTMLInputElement} answer // The answer provided by user
 * @param {string} url //The first url of giving api
 */
async function POST (answer, url) {
  const fetchData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ answer })

  }

  const response = await fetch(url, fetchData)

  return response
}

export { GET, POST }
