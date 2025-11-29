
/* plik zawiera tylko skrypty dla strony wiecej.html*/

const html = document.getElementById("html");
const motyw = document.getElementById("motyw");
const historia = document.getElementById("historia");

let ostatnieDzialanie = JSON.parse(localStorage.getItem("ostatnieDzialanie")) || [];


// Ustawienie motywu przy starcie
window.addEventListener("DOMContentLoaded", () => {
  
  if (localStorage.getItem("motyw") === "1") {
    html.classList.add("ciemny");
    document.getElementById("ikona").classList.add("icon-moon-inv");
  } else {
    html.classList.remove("ciemny");
  }
});



// Obsługa przycisku zmiany motywu
motyw.addEventListener("click", () => {
    const czyCiemny = html.classList.toggle("ciemny"); // true jeśli teraz jest ciemny
    document.getElementById("ikona").classList.toggle("icon-moon-inv");

    // Zapis do localStorage (1 = ciemny, 0 = jasny)
    localStorage.setItem("motyw", czyCiemny ? "1" : "0");
});



function wlaczhistorie() { 
// funkcja, która ukrywa przyciski i tworzy nowe pojemniki zawierające historie i funkcjonalne przyciski

    motyw.style.display = "none";
    historia.style.display = "none";

    // tworzenie nowych pojemników

    const pojemnikNaHistorie = document.createElement("div");

    const przyciskiHistorii = document.createElement("div");
    const cofanie = document.createElement("div");
    const usuwanieHistori = document.createElement("div");
    const tresc = document.createElement("div");

    const znak1 = document.createElement("i");
    const znak2 = document.createElement("i");

    // nadawanie klas

    pojemnikNaHistorie.className = "pojemnikNaHistorie";

    przyciskiHistorii.className = "przyciskiHistorii";
    cofanie.className = "cofnij";
    usuwanieHistori.className = "czysc";
    tresc.className = "tresc";

    znak1.className = "icon-left";
    znak2.className = "icon-trash";

    // wyswietlanie pojemników

    document.querySelector("article").appendChild(pojemnikNaHistorie);

    pojemnikNaHistorie.appendChild(tresc);
    pojemnikNaHistorie.appendChild(przyciskiHistorii);
    przyciskiHistorii.appendChild(cofanie);
    przyciskiHistorii.appendChild(usuwanieHistori);

    cofanie.appendChild(znak1);
    usuwanieHistori.appendChild(znak2);

    // wypisywanie historii

    if (
        Array.isArray(ostatnieDzialanie) &&
        ostatnieDzialanie.length === 1 &&
        ostatnieDzialanie[0].toLowerCase().includes("pusta historia")
    )
        tresc.innerHTML = '<h2 style="text-align: center;">Pusta Historia</h2>';
    
    else {
        tresc.innerHTML = `
            <h3>Historia:</h3>
            ${ostatnieDzialanie.slice(0, -1).join("<br>")}
            <h3>Ostatnie działanie:<br>
            ${ostatnieDzialanie.slice(-1).join("")}</h3>
        `;
    }

    // powrót do "motywu" i "historii"
    cofanie.addEventListener("click", () => {
        pojemnikNaHistorie.remove();

        motyw.style.display = "";
        historia.style.display = "";
    });


    usuwanieHistori.addEventListener("click", () => {

        const komunikat = ["<h2>Pusta Historia</h2>"];

        localStorage.setItem("ostatnieDzialanie", JSON.stringify(komunikat));

        localStorage.setItem("sprezenieZwrotne", "1");// sygnał powroty do kalkulator.js o tym aby wyczyscic tablice z wynikami

        ostatnieDzialanie = komunikat;
        tresc.innerHTML = '<h2 style="text-align: center;">Pomyślnie Usunięto Historię</h2>';
    });
}
