const routes = {
    home: "views/pages/home.html",
    profil: "views/pages/profil.html",
    projet: "views/pages/projet.html",
    cv: "views/pages/cv.html",
};

async function loadPartial(targetId, file) {
    const reponse = await fetch(file);
    const html = await reponse.text();
    document.getElementById(targetId).innerHTML =html;
};

async function loadPage(page){
    const file = routes[page] || routes.home;

    const cssMap = {
        home: "assets/css/home.css",
        profil: "assets/css/profil.css",
        projet: "assets/css/projet.css",
        cv: "assets/css/cv.css"
    }

    if (cssMap[page]) loadCSS(cssMap[page]);

    try {
        const reponse = await fetch(file);
        const html  = await reponse.text();
        document.getElementById("app").innerHTML = html;

        loadPageScript(page);

    } catch (error) {
        document.getElementById("app").innerHTML = "<h2>Erreur de chargement</h2>";
    }
}

async function loadCSS(file) {

    const oldLink = document.getElementById("page-css");
    if (oldLink) oldLink.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = file;
    link.id = "page-css";
    document.head.appendChild(link);    
}

async function loadPageScript(page) {

    const scripts = {
        home: "assets/js/home.js",
    };

    const oldScript = document.getElementById("page-script");
    if (oldScript) oldScript.remove();

    if (scripts[page]) {
        const script = document.createElement("script");
        script.src = scripts[page];
        script.id = "page-script";
        document.body.appendChild(script);
    }
}

function router() {
    let page = location.hash.replace("#", "");

    if  (!page) {
        page = "home";
        history.replaceState(null, "", "#home");
    }

    loadPage(page);
}

window.addEventListener("load", async () => {
    await loadPartial("navbar", "views/partials/navbar.html");
    await loadPartial("footer", "views/partials/footer.html");
    router();
});

window.addEventListener("hashchange", router);