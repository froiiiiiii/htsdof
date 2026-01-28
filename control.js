const navItems = document.querySelectorAll(".navegation-bar-list > .navegation-bar-item");
const contenedor = document.getElementById("main-content");
const loader = document.getElementById("loader");
const navList = document.getElementById("navegation-bar-list");
const navButton = document.getElementById("navegation-bar-button");
const width = window.innerWidth;

if (width <= 880){navList.classList.add("responsive")}

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

    loader.classList.add("visible");
    fetch(`./sections/${name}.html`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        
        loader.classList.remove("visible");
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
            cargarSeccion()
        }

        return
    }
    if (item === null || item === undefined ) {return}

    navItems.forEach(i => i.classList.remove("active"));
    closeNavBar()
    item.classList.add("active");
    changeUrl(item.id);
    cargarContenido()
    cargarSeccion()

}

function changeUrl(name){
    const nuevaRuta =  `index.html#${name}`;
    console.log("cambiando a index");
    
    history.replaceState({}, "", nuevaRuta);
}

// cosas necesaria para el navbar responsive
navButton.addEventListener("click", () => {
    closeNavBar()
})

function closeNavBar(){
    navButton.classList.toggle("active");
    navList.classList.toggle("ocult");
}

closeNavBar()

function cargarSeccion(){
    const seccion = document.querySelector(".seccion");
    if (seccion.classList.contains("second")) {
        cargarAnimacionesSectionDos();
    }
    const items = document.querySelectorAll(".seccion > .father > .child");

    items.forEach(item => {
        item.classList.add("visible");
    })
}

function cargarAnimacionesSectionDos(){
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".card");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0, total = 3, actual = 1;
const cardWidth = cards[0].offsetWidth;

next.addEventListener("click", () => {
    if (actual != total){
        next.classList.remove("end")
        prev.classList.remove("end")
        actual++
    }else{
        prev.classList.remove("end")
        next.classList.add("end")
    }
  if (index < cards.length - 1) {
    index++;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});

prev.addEventListener("click", () => {
if (actual > 1){
        prev.classList.remove("end")
        next.classList.remove("end")
        actual--
    }
    else if(actual < 1){
        next.classList.remove("end")
        prev.classList.add("end")
        actual = 1
    }
    else{
        next.classList.remove("end")
        prev.classList.add("end")
    }

  if (index > 0) {
    index--;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});

}
