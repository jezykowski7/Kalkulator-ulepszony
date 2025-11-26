
/* plik zawiera tylko skrypty dla strony systemyLiczbowe.html*/

const htmlEl = document.documentElement;
// Ustawienie motywu przy starcie
if(localStorage.getItem("motyw") === "1") {
    htmlEl.classList.add("ciemny");
} else {
    htmlEl.classList.remove("ciemny");
}




const bin = document.getElementById('binarny');
const oct = document.getElementById('oktalny');
const dec = document.getElementById('dziesietny');
const hex = document.getElementById('heksadecymalny');

const binLiczby = ['0', '1'];
const octLiczby = ['0', '1', '2', '3', '4', '5', '6', '7'];
const decLiczby = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const hexLiczby = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

bin.addEventListener('input', () => konwertuj(bin, binLiczby));
oct.addEventListener('input', () => konwertuj(oct, octLiczby));
dec.addEventListener('input', () => konwertuj(dec, decLiczby));
hex.addEventListener('input', () => konwertuj(hex, hexLiczby));

function konwertuj(JakiInput, zakres) {// Funkcja konwersji systemów
  let wartosc = JakiInput.value.trim().toUpperCase();

  if (!wartosc) {
      bin.value = oct.value = dec.value = hex.value = "";
      return;
  }

  const dozwolone = zakres.join('');
  wartosc = wartosc.split('').filter(c => dozwolone.includes(c)).join('');
  JakiInput.value = wartosc;

  try {

    let liczba;

    switch(JakiInput.id) {
      case 'binarny':
        liczba = parseInt(wartosc, 2);
        break;
      case 'oktalny':
        liczba = parseInt(wartosc, 8);
        break;
      case 'dziesietny':
        liczba = parseInt(wartosc, 10);
        break;
      case 'heksadecymalny':
        liczba = parseInt(wartosc, 16);
        break;
      default:
        return;
    }

    if (isNaN(liczba)){ return; }

    // Aktualizacja wszystkich inputów oprócz tego do którego aktualnie jest wpisywana liczba
    if (JakiInput !== bin) bin.value = liczba.toString(2);
    if (JakiInput !== oct) oct.value = liczba.toString(8);
    if (JakiInput !== dec) dec.value = liczba.toString(10);
    if (JakiInput !== hex) hex.value = liczba.toString(16).toUpperCase();

  } catch(e) {
    console.error('Błąd konwersji:', e);
  }
}


