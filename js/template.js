async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        let element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function showNavMenu() {
    let header_nav_position = document.getElementById('header_nav');
    if (header_nav_position.classList.contains('header_nav_active')) {
        header_nav_position.classList.remove('header_nav_active')
    }
    else {
        header_nav_position.classList.add('header_nav_active')
    }

}