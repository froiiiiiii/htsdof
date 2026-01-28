const navItems = document.querySelectorAll(".navegation-bar-list > .navegation-bar-item");
const contenedor = document.getElementById("main-content");

navItems.forEach(item => {
        item.addEventListener(
            "click", (item) => activeNavItem(item.target)
        )
    }
);



document.addEventListener("DOMContentLoaded", () => {
    cargarContenido();
});

function cargarContenido(nf=false) {
    let name = window.location.hash.substring(1);
    
    if (name === "") {name = "wrtd"}

    if (nf) { name = "404"}

    fetch(`./sections/${name}.html`)
    .then(response => {
        if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
        contenedor.innerHTML = data;
        let item = document.getElementById(name);
        activeNavItem(item,update=false)
    })
    .catch(error => {
        console.error("Error al cargar el contenido:", error);
        cargarContenido(true);
    })
    
}


function activeNavItem(item, update=true) {
    if (!update){
        navItems.forEach(i => i.classList.remove("active"));
        if (item !== null && item !== undefined){
            item.classList.add("active");
        }
        return
    }
    if (item === null || item === undefined ) {return}

    navItems.forEach(i => i.classList.remove("active"));

    item.classList.add("active");
    changeUrl(item.id);
    cargarContenido()
    

}

function changeUrl(name){
    const nuevaRuta =  `home.html#${name}`;
    console.log(name);
    
    history.replaceState({}, "", nuevaRuta);
}