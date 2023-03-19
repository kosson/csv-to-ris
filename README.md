# csv-to-ris

@en_GB This script maps a CSV bibliographic record set to a RIS bibliographic record set. Also contains the project in OpenRefine for data massaging. Follow the Undo/Redo history.
This version of the script is not including abstract column.

@ro_RO Acesta este un script Node.js care transformă o structură simplă CSV într-un fișier RIS.

Fișierul CSV se va pune în subdirectorul `assets`. Din motiv demonstrativ, am lăsat un fișier de lucru care acoperă articolele prezentate la SWIB până în prezent.
Pentru a prelucra propriile date, acest fișier va fi înlocuit cu cel propriu. Sursa datelor poate fi oricare. Pentru propriul uz le-am obținut din Obsidian, le-am reformatat în OpenRefine și le-am introdus în LibreOffice Calc pentru a le salva cu fiecare câmp având datele introduse între ghilimele duble.

Pentru cei interesați de istoricul de transformare a datelor în OpenRefine, am lăsat în rădăcină proiectul care poate fi deschis fără probleme (conține și datele). Am folosit OpenRefine 3.7.1.
Vezi istoricul Undo/Redo și vei vedea pas cu pas cum am aplicat transformările datelor.

CSV-ul trebuie să-l formatezi cu fiecare coloană având în header codul corespunzător din RIS.

O captură de ecran este lămuritoare:

!['screenshot care oferă o imagine orientativă pentru formatare'](CSV-format.png)

Puncte la care trebuie acordată atenție:

1. Autorii trebuie formatați după următorul șablon: `familie,nume`. Dacă sunt mai mulți, vor fi separați prin punct și virgulă: `familie,nume;familie,nume;familie,nume`.
2. Cuvintele cheie trebuie separate prin virgule fără spații: `cu_cheie1,cuv_cheie2`.

Pentru a face conversia, tot ce mai rămâne este să executați scriptul: `node app.js`. La final, vei obține în rădăcina proiectului fișierul cu extensia ris.
Acesta poate fi importat mai departe în aplicații specializate precum Zotero sau EndNote.