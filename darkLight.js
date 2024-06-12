// Sidebar toggle
const body = document.querySelector('body'),
    sidebar = body.querySelector('nav.sidebar'),
    toggle = body.querySelector(".toggle"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

// Carregar o estado do modo do armazenamento local no carregamento da página
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add("dark");
    modeText.innerText = "Light mode";
} else {
    body.classList.remove("dark");
    modeText.innerText = "Dark mode";
}

// Sidebar toggle
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Modo alternado
modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
        localStorage.setItem('darkMode', 'true');
    } else {
        modeText.innerText = "Dark mode";
        localStorage.setItem('darkMode', 'false');
    }
});
