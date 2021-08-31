export async function post(url, data){
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export async function json_body(response){
    return await response.json()
}
