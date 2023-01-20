
/**
 *
 * @param url
 */
async function GET (url) {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

/**
 *
 * @param answer
 * @param url
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
