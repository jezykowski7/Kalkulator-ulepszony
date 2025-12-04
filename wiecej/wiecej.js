
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
    const czyCiemny = html.classList.toggle("ciemny");
    document.getElementById("ikona").classList.toggle("icon-moon-inv");

    localStorage.setItem("motyw", czyCiemny ? "1" : "0");
});




function wlaczHistorie() {// funkcja pokazująca historie

    motyw.style.display = "none";
    historia.style.display = "none";

    // Tworzenie nowych pojemników
    const pojemnikNaHistorie = document.createElement("div");

    const przyciskiHistorii = document.createElement("div");
    const cofanie = document.createElement("div");
    const usuwanieHistori = document.createElement("div");
    const tresc = document.createElement("div");

    const znak1 = document.createElement("i");
    const znak2 = document.createElement("i");

    // Nadawanie klas
    pojemnikNaHistorie.className = "pojemnikNaHistorie";

    przyciskiHistorii.className = "przyciskiHistorii";
    cofanie.className = "cofnij";
    usuwanieHistori.className = "czysc";
    tresc.className = "tresc";

    znak1.className = "icon-left";
    znak2.className = "icon-trash";

    // Wyświetlanie pojemników
    document.querySelector("article").appendChild(pojemnikNaHistorie);

    pojemnikNaHistorie.appendChild(tresc);
    pojemnikNaHistorie.appendChild(przyciskiHistorii);
    przyciskiHistorii.appendChild(cofanie);
    przyciskiHistorii.appendChild(usuwanieHistori);

    cofanie.appendChild(znak1);
    usuwanieHistori.appendChild(znak2);


    // Wypisywanie historii
    if (!Array.isArray(ostatnieDzialanie) || ostatnieDzialanie.length === 0)
        tresc.innerHTML = '<h2 style="text-align: center;">Pusta Historia</h2>';

    else {
        tresc.innerHTML = `
            <h3>Historia:</h3>
            ${ostatnieDzialanie.slice(0, -1).join("<br>")}
            <h3>Ostatnie działanie:<br>
            ${ostatnieDzialanie.slice(-1)}</h3>
        `;
    }


    // Powrót
    cofanie.addEventListener("click", () => {
        pojemnikNaHistorie.remove();

        motyw.style.display = "";
        historia.style.display = "";
    });


    // Czyszczenie historii
    usuwanieHistori.addEventListener("click", () => {

        ostatnieDzialanie = [];
        localStorage.setItem("ostatnieDzialanie", JSON.stringify([]));
        localStorage.setItem("sprezenieZwrotne", "1");

        tresc.innerHTML = '<h2 style="text-align: center;">Pomyślnie usunięto historię</h2>';
    });

}
