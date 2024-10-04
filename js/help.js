
async function addUser() {
    let name = document.getElementById('name').value;
    let mail = document.getElementById('email').value;
    await postUser("/user", { "name": name, "mail": mail });
    await loadUser();
    renderUser();
}

function renderUser() {
    let content = document.getElementById('user');

    let tableHTML = '<table>';
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        tableHTML += /*html*/ `
        <tr>
            <td>${user.mail}</td>
            <td>${user.name}</td>
            <td><button onclick="deleteUser('/user/${user.id}')">Löschen</button></td>
            <td><button onclick="showChangeUser(${i})">Ändern</button></td>
        </tr>
        <tr id="change_container_${i}" style='display: none;'>
            <td><input id="email_change_${i}" type="email" placeholder="Bitte Email eingeben"></td>
            <td><input id="name_change_${i}" type="name" placeholder="Bitte Namen eingeben"></td>
            <td><button onclick="changeUser('/user/${user.id}', ${i})">Hinzufügen</button>
            
        </tr>
        `
    }
    tableHTML += '</table>'
    content.innerHTML = tableHTML;
}

/**
 * This funtion change the User Data
 * 
 * @param {number} i This is the user that should be changed
 */
function showChangeUser(i) {
    document.getElementById(`change_container_${i}`).style.display = '';
}

async function changeUser(path, i) {
    let name = document.getElementById(`name_change_${i}`).value;
    let mail = document.getElementById(`email_change_${i}`).value;
    await changeData(path, { "name": name, "mail": mail });
    await loadUser();

}


async function changeData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response.json();
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

async function loadUser(path = "/user") {
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJson = await response.json();

    users = [];

    let UserKeysArray = Object.keys(responseToJson);
    for (let i = 0; i < UserKeysArray.length; i++) {
        users.push(
            {
                id: UserKeysArray[i],
                mail: responseToJson[UserKeysArray[i]].mail,
                name: responseToJson[UserKeysArray[i]].name,
            }
        )
    }
    //users = responseToJson ? Object.keys(responseToJson).map(key => ({ key, ...responseToJson[key] })) : [];
    renderUser();
}

async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    return responseToJson = await response.json();
}

async function deleteUser(user) {
    await deleteData(user);
    loadUser();
}
