async function addTaskInit() {
    let current_user = JSON.parse(sessionStorage.getItem('current_user'));
    await loadCurrentUserData(current_user.id);
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