
async function GET(url) {
    const response = await fetch(url);
    const data = await response.json();
}

async function POST(answer, url) {

    let fetchData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({"answer": answer}),
    
    }

    let response = await fetch(url, fetchData)
    console.log(response.url)

}
GET("https://courselab.lnu.se/quiz/question/1")
POST(2,"https://courselab.lnu.se/quiz/answer/1")    