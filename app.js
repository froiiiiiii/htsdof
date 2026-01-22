const btn = document.getElementById("toggle-btn-sidebar");

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach((seccion) => {
    seccion.classList.remove("activa");
  });
  document.getElementById(id).classList.add("activa");
}

function hideSidebar(){
    
    btn.classList.remove("expandido");
    btn.classList.add("contraido");
    sidebar.classList.remove("expandido");
    sidebar.classList.add("contraido");
    console.log("asd");
    
}

document.querySelectorAll("li[data-target]").forEach(b => {
  b.addEventListener("click", () => {
    const id = b.dataset.target;
    document.getElementById(id).scrollIntoView({
      behavior: "smooth"
    });
  });
});

function hideSidebar(){
    btn.classList.remove("expandido");
    btn.classList.add("contraido");
    sidebar.classList.remove("expandido");
    sidebar.classList.add("contraido");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");

  if (sidebar.classList.contains("expandido")) {
    btn.classList.remove("expandido");
    btn.classList.add("contraido");
    sidebar.classList.remove("expandido");
    sidebar.classList.add("contraido");
  } else {
    sidebar.classList.remove("contraido");
    sidebar.classList.add("expandido");
    btn.classList.remove("contraido");
    btn.classList.add("expandido");
  }
}

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