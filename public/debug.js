window.onerror = function (msg, url, linenumber) {
    // alert(`Error message: ${msg}\nUrl: ${url}\nLine Number: ${linenumber}`
    // )

    fetch('/debug/err', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            message: msg,
            url: url,
            linenumber: linenumber
        })
    }).catch(() => {
        alert(`Error message: ${msg}\nUrl: ${url}\nLine Number: ${linenumber}`)
    })

    return true;
}

console.log = function (text){
    post('/debug/log', {
        kind: "Log",
        message: text
    }).catch(err => {
        alert(`Cannot connect to debug server. Message: console.log() ${text}`)
    })
}



async function post(url, data){
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}