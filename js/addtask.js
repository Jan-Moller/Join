let contacts = [
    {
        "initials": "JD",
        "initials_color": "#FF5733",
        "name": "John Doe",
        "id": "0"
    },
    {
        "initials": "AS",
        "initials_color": "#33FF57",
        "name": "Alice Smith",
        "id": "1"
    },
    {
        "initials": "BW",
        "initials_color": "#3357FF",
        "name": "Bob Williams",
        "id": "2"
    },
    {
        "initials": "CM",
        "initials_color": "#F39C12",
        "name": "Charlie Miller",
        "id": "3"
    },
    {
        "initials": "KP",
        "initials_color": "#8E44AD",
        "name": "Karen Peterson",
        "id": "4"
    }
];


let selected_contacts = [];
let subtasks = [];


async function addTaskInit() {
    let current_user = JSON.parse(sessionStorage.getItem('current_user'));
    await loadCurrentUserData(current_user.id);
    renderUserContacts();
}

function toggleCategoryDropdown(event) {
    event.preventDefault();
    let content = document.getElementById("dropdown_content_category");
    let img = document.getElementById('category_dropdown_img')

    if (content.style.display === "block") {
        content.style.display = "none";
        img.src = 'assets/img/open_arrow_drop_down.png'
    } else {
        content.style.display = "block";
        img.src = 'assets/img/closed_arrow_drop_down.png'
    }
}

function selectCategoryOption(option) {
    document.getElementById("dropdown_button_category").innerHTML = option + `<img id="category_dropdown_img" src="assets/img/open_arrow_drop_down.png" alt="Bild eines Öffnungs Symbols">`;
    document.getElementById("dropdown_content_category").style.display = "none";
}

window.onclick = function (event) {
    if (!event.target.matches('.dropdown_button_category')) {
        let dropdowns = document.getElementsByClassName("dropdown_content_category");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
}

function selectPrioty(prio) {
    let urgent_btn = document.getElementById('urgent');
    let medium_btn = document.getElementById('medium');
    let low_btn = document.getElementById('low');

    let priority = document.getElementById(prio);

    if (priority.classList.contains(prio)) {

        priority.classList.remove(prio);
    } else {

        urgent_btn.classList.remove('urgent');
        medium_btn.classList.remove('medium');
        low_btn.classList.remove('low');

        priority.classList.add(prio);
    }
}

function toggleContactsDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    let content = document.getElementById("dropdown_content_contacts");
    let img = document.getElementById('contacts_dropdown_img');

    if (content.style.display === "block") {
        content.style.display = "none";
        img.src = 'assets/img/open_arrow_drop_down.png';
    } else {
        content.style.display = "block";
        img.src = 'assets/img/closed_arrow_drop_down.png';
    }
}

function selectContactsOption(initials, id, color) {

    if (!selected_contacts.find(item => item.id === id)) {
        addContactToList(initials, id, color);
    }
    else { removeContactFromList(initials, id, color) }
}

function addContactToList(initials, id, color) {
    selected_contacts.push({ initials: initials, id: id, color: color });
    let list = document.getElementById('selected_contacts_list');
    list.innerHTML = '';
    for (let i = 0; i < selected_contacts.length; i++) {
        const contact = selected_contacts[i];
        list.innerHTML += /*html*/ `<div class="addtask_contact_initials_list" style="background-color: ${contact.color}">${contact.initials}</div>`;
    }
}

function removeContactFromList(initials, id, color) {
    let index = selected_contacts.findIndex(item => item.id === id);
    selected_contacts.splice(index, 1);
    let list = document.getElementById('selected_contacts_list');
    list.innerHTML = '';
    for (let i = 0; i < selected_contacts.length; i++) {
        const contact = selected_contacts[i];
        list.innerHTML += /*html*/ `<div class="addtask_contact_initials_list" style="background-color: ${contact.initials_color}">${contact.initials}</div>`;
    }
}

window.onclick = function (event) {
    let dropdown = document.getElementById("dropdown_content_contacts");
    let button = document.getElementById("dropdown_button_contacts");

    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.style.display = "none";
        let img = document.getElementById('contacts_dropdown_img');
        img.src = 'assets/img/open_arrow_drop_down.png';
    }
};

function renderUserContacts() {
    let list = document.getElementById('dropdown_content_contacts');
    list.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        list.innerHTML += /*html*/ `<div id="addtask_contact_container(${i})" class="addtask_contact_container" onclick="selectContactsOption('${contact.initials}', '${contact.id}', '${contact.initials_color}'), activateContact(${i})"><div id="addtask_initial(${i})" class="addtask_contact_initials">${contact.initials}</div> <div class="addtask_contact_name">${contact.name}</div><img id="addtask_contact_checkbox(${i})" class="addtask_checkbox" src="assets/img/checkbox.png"></div> `
        setInitialsBackgroundColor(contact.initials_color, i)
    }
}

function setInitialsBackgroundColor(color, id) {
    let initials = document.getElementById(`addtask_initial(${id})`);
    initials.style.backgroundColor = color;
}

function activateContact(i) {
    let contact = document.getElementById(`addtask_contact_container(${i})`);
    let img = document.getElementById(`addtask_contact_checkbox(${i})`)

    if (contact.classList.contains('active_contact')) {
        contact.classList.remove('active_contact');
        img.src = 'assets/img/checkbox.png';
    }
    else {
        contact.classList.add('active_contact');
        img.src = 'assets/img/checkbox_white.png';
    }
}

document.querySelector('.subtask_input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addSubtask();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.target.classList.contains('subtask_list_input') && event.key === 'Enter') {
        event.preventDefault();
    }
});

function renderSubtasks() {
    let subtask_list = document.getElementById('subtask_list');
    subtask_list.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];

        subtask_list.innerHTML += /*html*/ `
        <div class="subtask_list">
        <li><input class="subtask_list_input" value="${subtask}"><div class="subtask_list_active_input_img"><img src="assets/img/delete_subtask.png" alt="" onclick="deleteSubtask(${i})"><img class="test" src="assets/img/seperator.png" alt=""><img onclick="addSubtask()" src="assets/img/check_black.png" alt=""></div></li>
        
        </div>`
    }
}

function addSubtask() {
    let subtask = document.getElementById('added_subtask');
    subtasks.push(subtask.value);
    renderSubtasks() 
    subtask.value = '';
}

function deleteSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks() 

}

const subtaskInput = document.querySelector('.subtask_input');
const checkIcon = document.querySelector('.subtask_active_input_img img:nth-child(3)'); 

subtaskInput.addEventListener('blur', function(event) {
    if (event.relatedTarget === checkIcon) {
        addSubtask();
    }
});

checkIcon.setAttribute('tabindex', '0');
