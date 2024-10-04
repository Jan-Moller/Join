const BASE_URL =  'https://join-your-organisation-default-rtdb.europe-west1.firebasedatabase.app/'

let users = [];

async function addUser() {
    let name = document.getElementById('name').value;
    let mail = document.getElementById('mail').value;
    let password = document.getElementById('password').value;
    await postUser("/users", { "name": name, "mail": mail, "password": password });
}

async function postUser(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return responseToJson = await response.json();
}
