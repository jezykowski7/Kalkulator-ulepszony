

let ostatnieDzialanie = localStorage.getItem("ostatnieDziałanie");
let historia = [];
historia.push(ostatnieDzialanie);
console.table(historia);

// Ustawienie motywu przy starcie
const html = document.getElementById("html");
if(localStorage.getItem("motyw") === "1") {
    html.classList.add("ciemny");
    document.getElementById("ikona").classList.add("icon-moon-inv");
} else {
    html.classList.remove("ciemny");
}

// Obsługa przycisku zmiany motywu
document.getElementById("motyw").addEventListener("click", () => {
    const czyciemny = html.classList.toggle("ciemny"); // true jeśli teraz jest ciemny
    document.getElementById("ikona").classList.toggle("icon-moon-inv");

    // Zapis do localStorage (1 = ciemny, 0 = jasny)
    localStorage.setItem("motyw", czyciemny ? "1" : "0");
});
