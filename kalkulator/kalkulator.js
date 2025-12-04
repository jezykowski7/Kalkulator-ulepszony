
/* plik zawiera tylko skrypty dla strony index.html*/

// zmienne globalne
let sklejonyText = "";
let wynikPokazany = false;
let ostatnieDzialanie = JSON.parse(localStorage.getItem("ostatnieDzialanie") || "[]");
let sprezenieZwrotne = Number(localStorage.getItem("sprezenieZwrotne") || 0);

const wyswietlacz = document.getElementById("wyswietlacz");
const pierwiastek = document.getElementById("pierwiastek");
const operatory = ["+", "-", "*", "/", "%", "."];





// Ustawienie motywu przy starcie
window.addEventListener("DOMContentLoaded", () => {
  const html = document.getElementById("html");

  if (localStorage.getItem("motyw") === "1") {
    html.classList.add("ciemny");
  } else {
    html.classList.remove("ciemny");
  }
});





// dodawanie liczb za pomocą przycisków
document.querySelectorAll(".przycisk").forEach((div) => {
  div.addEventListener("click", () => {
    const wartosc = div.textContent.trim();
    if (wartosc === "C" || wartosc === "=") return;
    dodajZnak(wartosc);
  });
});





// dodawanie znaków z klawiatury
document.addEventListener("keydown", (e) => {
  const klawisz = e.key;
  const cyfry = "0123456789";

  if (cyfry.includes(klawisz)) dodajZnak(klawisz);
  if (operatory.includes(klawisz)) dodajZnak(klawisz);

  if (klawisz === "Enter") liczenie();
  if (klawisz === "Backspace") {
    sklejonyText = sklejonyText.slice(0, -1);
    wyswietlacz.textContent = sklejonyText || "0";
  }

  if (klawisz.toLowerCase() === "c") usun();
});





// zamienianie otwarcia [sqrt(] pierwiastka na zamknięcie [)]
pierwiastek.addEventListener("click", () => {
  const zamkniecie = pierwiastek.querySelector(".zamkniecie");
  const otwarcie = pierwiastek.querySelector(".otwarcie");

  if (!zamkniecie) {
    const noweZamkniecie = document.createElement("div");
    otwarcie?.remove();
    noweZamkniecie.className = "zamkniecie";
    noweZamkniecie.textContent = ")";
    pierwiastek.appendChild(noweZamkniecie);
  } else {
    zmiana();
  }
});





// czyszczenie wyświetlacza
function usun() {
  wyswietlacz.textContent = "0";
  sklejonyText = "";
  wynikPokazany = false;

  zmiana();
}






// obliczanie zawartości wyświetlacza
function liczenie() {
  try {
    let wyrazenie = sklejonyText;

    // usuwanie ostatniego dodanego elementu gdy jest to operator
    if (operatory.includes(wyrazenie.slice(-1))) wyrazenie = wyrazenie.slice(0, -1);

    // zamiana "%" na 0.01 (bez tego wychodziłaby reszta z dzielenia)
    wyrazenie = wyrazenie.replace(/(\d+(\.\d+)?(e[+-]?\d+)?)%/gi, "($1*0.01)");

    // dodawanie brakujących ")"
    {
      const iloscOtwarc = (wyrazenie.match(/sqrt\(/g) || []).length;
      const iloscZamkniec = (wyrazenie.match(/\)/g) || []).length;
      const brakujace = iloscOtwarc - iloscZamkniec;

      if (brakujace > 0) {
        for (let i = 0; i < brakujace; i++) wyrazenie += ")";
      }
    }

    // obliczanie wyrażenia
    let wynik = math.evaluate(wyrazenie);
    wypisywanie(wynik);
    zmiana();

    if (wynik === Infinity || isNaN(wynik))
      throw new Error("Błąd dzielenia przez zero!");

    // dodawanie wyników do historii
    if (String(wyrazenie) != String(wynik)) {
      ostatnieDzialanie.push(wyrazenie + " = " + Number(wynik.toFixed(6)).toString());

      // jeśli historia ma więcej niż 10 wpisów — usuń najstarszy
      if (ostatnieDzialanie.length > 10) {
        ostatnieDzialanie.shift();
      }

      localStorage.setItem("ostatnieDzialanie", JSON.stringify(ostatnieDzialanie));
    }

  } catch (err) {
    // wyświetlanie błędu jeśli taki występuje
    console.error("Błąd podczas obliczeń:", err);
    wyswietlacz.textContent = "Błąd";

    if (sklejonyText === "Infinity" || sklejonyText === "NaN")
      alert(err.message);

    sklejonyText = "";
    wynikPokazany = false;
  }
}





// wypisywanie wyniku na ekran
function wypisywanie(wynik) {
  let po = "";

  if (typeof wynik === "number" && Number.isFinite(wynik)) {
    // zaokrąglenie do 10 miejsc, aby uniknąć drobnych błędów zmiennoprzecinkowych
    wynik = Number(wynik.toFixed(10));

    const tekst = wynik.toString();
    if (tekst.includes(".")) [, po] = tekst.split(".");
  }

  // jeśli część po przecinku jest zbyt długa to wyświetla zaokrąglony wynik
  if (po.length > 6) {
    wynik = Number(wynik.toFixed(6));
    wyswietlacz.textContent = "~" + wynik;
  } else {
    wyswietlacz.textContent = wynik;
  }

  sklejonyText = String(wynik);
  wynikPokazany = true;
}





// dodawanie wartości do wyświetlacza
function dodajZnak(wartosc) {


  if (wynikPokazany) {
    if (operatory.includes(wartosc) && wartosc !== ".")
      wynikPokazany = false;

    else {
      sklejonyText = "";
      wynikPokazany = false;
    }
  }
  
  const ostatni = sklejonyText.slice(-1);
  // zabezpieczenie przed 2 operatorami różnymi od "-" (możliwość liczb ujemnych)
  if (
    (sklejonyText === "" && operatory.includes(wartosc) && wartosc !== "-") ||
    (operatory.includes(ostatni) &&
      operatory.includes(wartosc) &&
      !(ostatni !== "-" && wartosc === "-") &&
      !(ostatni === "%" && wartosc !== "%"))
  ) {
    return;
  }


  if (wynikPokazany) wynikPokazany = false;


  // limit do 20 znaków
  if (sklejonyText.length + wartosc.length > 20) {
    console.log("Limit do 20 znaków");
    alert("Kalkulator posiada limit do 20 znaków");
    return;
  }


  sklejonyText += wartosc; // klejenie tekstu
  wyswietlacz.textContent = sklejonyText;

  // przewinięcie divu do prawej krawędzi
  wyswietlacz.scrollLeft = wyswietlacz.scrollWidth;
}




// funkcja zamieniająca zamknięcie nawiasu [)] na otwarcie [sqrt(] 
// aby można było użyć tego samego kawałka kodu 3 razy
function zmiana() {
  const zamkniecie = pierwiastek.querySelector(".zamkniecie");
  const otwarcie = pierwiastek.querySelector(".otwarcie");

  const noweOtwarcie = document.createElement("div");
  const ikona = document.createElement("i");

  zamkniecie?.remove();
  otwarcie?.remove();

  noweOtwarcie.className = "otwarcie";
  ikona.className = "icon-math";

  noweOtwarcie.appendChild(ikona);
  pierwiastek.appendChild(noweOtwarcie);
  noweOtwarcie.appendChild(document.createTextNode("sqrt("));
}
