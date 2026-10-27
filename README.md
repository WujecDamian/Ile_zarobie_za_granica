# Ile zarobię za granicą

Prosta aplikacja, która liczy szacunkową pensję brutto za granicą i przelicza ją na złotówki.

Wybierasz kraj, stawkę godzinową, dni, godziny i nadgodziny. Kurs waluty pochodzi z darmowego API i nie wymaga klucza.

Kwota główna jest brutto. Pod nią jest szacunek netto dla umowy o pracę w Polsce: osobno dla osób poniżej 26 lat i dla osób, które mają 26 lat lub więcej.

## Uruchomienie

```bash
cd client
npm install
npm run dev
```

Testy wyliczenia:

```bash
cd client
npm test
```
