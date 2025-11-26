

let ostatnieDzialanie = localStorage.getItem("ostatnieDziałanie");
let historia = [];
historia.push(ostatnieDzialanie);
console.table(historia);

const htmlEl = document.documentElement;

// Ustawienie motywu przy starcie
if(localStorage.getItem("motyw") === "1") {
    htmlEl.classList.add("ciemny");
    document.getElementById("ikona").classList.add("icon-moon-inv");
} else {
    htmlEl.classList.remove("ciemny");
}

// Obsługa przycisku zmiany motywu
document.getElementById("motyw").addEventListener("click", () => {
    const isDark = htmlEl.classList.toggle("ciemny"); // true jeśli teraz jest ciemny
    document.getElementById("ikona").classList.toggle("icon-moon-inv");

    // Zapis do localStorage (1 = ciemny, 0 = jasny)
    localStorage.setItem("motyw", isDark ? "1" : "0");
});
