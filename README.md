
# Kalkulator + Systemy Liczbowe + Historia Obliczeń

## Opis
Projekt składa się z interaktywnego kalkulatora internetowego, konwertera systemów liczbowych oraz panelu „Więcej” z historią obliczeń i możliwością zmiany motywu.  

- **Kalkulator**: podstawowe działania arytmetyczne, procenty, pierwiastki kwadratowe.  
- **Systemy Liczbowe**: konwersja między systemami binarnym, ósemkowym, dziesiętnym i szesnastkowym.  
- **Więcej**: włączanie historii ostatnich obliczeń i zmiana motywu (jasny/ciemny).  

Projekt korzysta z **JavaScript**, **CSS**, **HTML** oraz biblioteki **math.js** do obliczeń matematycznych.

---

## Struktura plików

/Kalkulator-aplikacja/
        |
        ├─index.html
        ├─style.css --> style wspólne dla index.html i reszty podstron
        ├─kalkulator/
        |     ├─kalkulator.css
        |     └─kalkulator.js
        ├─systemyLiczbowe/
        |        ├─systemyLiczbowe.css  
        |        ├─systemyLiczbowe.html  
        |        └─systemyLiczbowe.js  
        ├─wiecej/
        |   ├─wiecej.css  
        |   ├─wiecej.html  
        |   └─wiecej.js
        |
        ├─fontello-20b0d37c/ --> (pobrane z fontello.com)
        └─README.md <-- tu jesteś :)

---

## Możliwe błędy
- **Strona powinna być rozpakowana w przeciwnym razie mogą wystąpić błędy z załadowaniem stylów oraz skryptów JS**

---

## Funkcjonalności

### Kalkulator
- Wyświetlacz pokazujący aktualne wprowadzone dane oraz wynik.
- Klawiatura kalkulatora na ekranie: 
    - cyfry 0–9, kropka dziesiętna, operatory (+, −, ×, ÷), 
    - procent, pierwiastek, 
    - przycisk C (kasuj), 
    - przycisk =
- Pierwiastki kwadratowe (`sqrt`)  
- Ograniczenie długości wyrażenia do 20 znaków  
- Historia ostatnich 10 działań (przechowywana w `localStorage`)  
- **Obsługa klawiatury fizycznej (`mapowanie klawiszy do przycisków`)**


### Systemy Liczbowe
- Automatyczna konwersja między systemami: 
    - binarny, 
    - ósemkowy, 
    - dziesiętny, 
    - szesnastkowy  
- Walidacja wprowadzanych znaków  


### Więcej
- **Zmiana motywu strony (jasny / ciemny)**  
- **Historia działań z opcją cofania i czyszczenia**  
- **Historia zapisuje wszystkie ostatnie działania w `localStorage`**  

---

## Technologie
- HTML5  
- CSS3
- JavaScript
- Biblioteka math.js

---

## Uruchomienie
1. Pobierz wszystkie pliki projektu wraz ze strukturą katalogów.  
2. Otwórz **index.html** w przeglądarce internetowej.  
3. Nawiguj między stronami przy użyciu menu po lewej stronie.  


## Zaprojektował i Zaprogramował
**Bartłomiej Król**