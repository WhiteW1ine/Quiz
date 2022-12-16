
async function GET(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
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
    response = response.json();

    return response;    
}  

export {GET, POST};