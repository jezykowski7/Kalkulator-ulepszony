
/* plik zawiera tylko skrypty dla strony index.html*/

let sklejonyText = "";
let wynikPokazany = false;
const wyswietlacz = document.getElementById("wyswietlacz");
const operatory = ["+", "-", "*", "/", "%", "."];

const pierwiastek = document.getElementById("pierwiastek");



const htmlEl = document.documentElement;
// Ustawienie motywu przy starcie
if(localStorage.getItem("motyw") === "1") {
    htmlEl.classList.add("ciemny");
} else {
    htmlEl.classList.remove("ciemny");
}





document.querySelectorAll(".przycisk").forEach((div) => {//dodawanie liczb za pomocą przycisków
  div.addEventListener("click", () => {
    const wartosc = div.textContent.trim();

    if (wartosc === "C" || wartosc === "=") return;

    dodajZnak(wartosc);
  });
});

document.addEventListener("keydown", (e) => {//dadawanie znaków z klawiatury
  const klawisz = e.key;

  const cyfry = "0123456789";

  if (cyfry.includes(klawisz)) {
    dodajZnak(klawisz);
  }

  if (operatory.includes(klawisz)) {
    dodajZnak(klawisz);
  }

  if (klawisz === "Enter") {
    liczenie();
  }

  if (klawisz === "Backspace") {
    sklejonyText = sklejonyText.slice(0, -1);
    wyswietlacz.textContent = sklejonyText || "0";
  }

  if (klawisz.toLowerCase() === "c") {
    usun();
  }
});

pierwiastek.addEventListener("click", () => {//zamienianie otwarcia [sqrt(] pierwiastka z zamknieciem [)]
  const zamkniecie = pierwiastek.querySelector(".zamkniecie");
  const otwarcie = pierwiastek.querySelector(".otwarcie");

  if (!zamkniecie) {
    const noweZamkniecie = document.createElement("div");
    noweZamkniecie.className = "zamkniecie";
    noweZamkniecie.textContent = ")";
    pierwiastek.appendChild(noweZamkniecie);

    otwarcie?.remove();
  } else {
    zmiana();
  }
});

function usun() {// czyszczenie wyświetlacza
  wyswietlacz.textContent = "0";
  sklejonyText = "";
  wynikPokazany = false;

  zmiana();
}

function liczenie() {// obliczanie zawrtosci wyswietlacza
  try {
    let wyrazenie = sklejonyText;// zmienna pomocnicza
    let ostatnieDzialanie;

    // zamiana "%" na 0.01 (bez tego wychodziłaby reszta z dzielenia)
    wyrazenie = wyrazenie.replace(/(\d+(\.\d+)?(e[+-]?\d+)?)%/gi, "($1*0.01)");

    const iloscOtwarc = (wyrazenie.match(/sqrt\(/g) || []).length;// licznie ile jest otwartych "sqrt("
    const iloscZamkniec = (wyrazenie.match(/\)/g) || []).length;// liczenie ile jest zamkniętych ")"
    const brakujace = iloscOtwarc - iloscZamkniec;    // obliczanie barkujących ")"

    if (brakujace > 0) {
      for (let i = 0; i < brakujace; i++)
        wyrazenie += ")";
    }

    ostatnieDzialanie = wyrazenie;

    let wynik = math.evaluate(wyrazenie); // obliczanie wyrażenia

    ostatnieDzialanie += " = " + wynik;

    console.log(ostatnieDzialanie);
    localStorage.setItem("ostatnieDziałanie", ostatnieDzialanie);

    wypisywanie(wynik);

    zmiana();

    if (sklejonyText === "Infinity" || sklejonyText === "NaN")
      throw new Error("Błąd dzielenia przez zero!");

  } catch (err) {//wyświetlanie błędu jeśli taki występuje
    console.error("Błąd podczas obliczeń:", err);

    wyswietlacz.textContent = "Błąd";

    if (sklejonyText === "Infinity" || sklejonyText === "NaN")
      alert(err.message);

    sklejonyText = "";
    wynikPokazany = false;
  }
}

function wypisywanie(wynik) { // wypisywanie wyniku na ekran

  let po = "";

  if (typeof wynik === "number" && Number.isFinite(wynik)) {
    // zaokrąglenie do 10 miejsc, aby uniknąć drobnych błędów zmiennoprzecinkowych
    wynik = Number(wynik.toFixed(10));

    const tekst = wynik.toString();

    if (tekst.includes("."))
      [, po] = tekst.split(".");
  }

  if (po.length > 6) {// wyswietlanie zaokraglonej liczby
    wynik = Number(wynik.toFixed(6));
    wyswietlacz.textContent = "~" + wynik;
  }
  else // wyswietlanie nie zaokrąglonej liczby
    wyswietlacz.textContent = wynik;

  sklejonyText = wynik.toString();
  wynikPokazany = true;
}

function dodajZnak(wartosc) { //dodawanie wartości do wyświetlacza

  // zabezpieczenie przed 2 operatorami różnymi od "-" (możliwość liczb ujemnych) 
  // oraz możliwość dodania % oraz innego operatora pod rząd (brak możliwości w 2 strone)
  {
    if (
      sklejonyText === "" &&
      operatory.includes(wartosc) &&
      wartosc !== "-"
    )
      return;

    const ostatni = sklejonyText.slice(-1);

    if (
      operatory.includes(ostatni) &&
      operatory.includes(wartosc) &&
      !(ostatni !== "-" && wartosc === "-") &&
      !(ostatni === "%" && wartosc !== "%")
    ) {
      return;
    }
  }

  if (wynikPokazany) {
    wynikPokazany = false;
  }

  if (sklejonyText.length + wartosc.length > 20) {//limit do 20 znaków
    console.log("Limit do 20 znaków");
    alert("Kalkulator posiada limit do 20 znaków");
    return;
  }

  sklejonyText += wartosc; //klejenie tekstu
  wyswietlacz.textContent = sklejonyText;


  // przewinięcie divu do prawej krawędzi
  wyswietlacz.scrollLeft = wyswietlacz.scrollWidth;
}

function zmiana() {
  //funkcja zamieniająca zamkniecie nawiasu[)] na otwarcie[sqrt(] aby mozna było użyć tego samego kawałka kodu 3 razy
  const zamkniecie = pierwiastek.querySelector(".zamkniecie");
  zamkniecie?.remove();

  const otwarcie = pierwiastek.querySelector(".otwarcie");
  otwarcie?.remove();

  const noweOtwarcie = document.createElement("div");
  noweOtwarcie.className = "otwarcie";

  const ikona = document.createElement("i");
  ikona.className = "icon-math";
  noweOtwarcie.appendChild(ikona);

  noweOtwarcie.appendChild(document.createTextNode("sqrt("))

  pierwiastek.appendChild(noweOtwarcie);
}