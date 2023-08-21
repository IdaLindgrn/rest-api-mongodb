## Inlämningsuppgift 2 (REST API med MongoDB)

Detta är kursens individuella inlämningsuppgift nummer 2 som ämnar till att utvärdera elevens individuella kunskaper kring ExpressJS, REST API och MongoDB samt följande lärandemål från kursplanen:

- Planering av att skapa dynamiska webbapplikationer
- Programmera databasdrivna webbplatser
- NoSQL databaser
- Databasdesign och normalisering av NoSQL databaser

Uppgiften är baserad på en tidigare teoretisk uppgift kring REST API och MongoDB databas design så ni bör känna igen den. Ni ska bygga ett litet REST API (med MongoDB) för en dansskola. API:et ska kunna hämta data kring kurser per termin samt lägga till deltagare till kurserna.

## Instruktioner

Forka detta repo (OBS: se "Fork" knappen i övre högra hörnet). Det kommer att skapa en kopia av detta repo på ditt Github som du ska använda som startpunkt för inlämningsuppgiften.

Servern för API:et är redan uppsatt. För att få igång den behöver du endast lägga till en giltig connection string i .env filen i MONGO_URI variabeln sen köra "npm run dev". Din uppgift består av att:

- Skapa de Mongoose models som behövs för nedanstående punkter
- I seedDb mappen finns filen seedDb.js (som kan köras med "npm run seedDb"). Lägg till kod för att populera din MongoDB databas enligt de Mongoose models som nämndes ovanför.
- API:et bör bestå av 4 routes:
  - En route för att hämta data om alla dansklasser (mockdata med info om de olika kurserna finns i /seedDb/mockdata). Man bör även kunna hämta data för endast aktiva klasser (_OBS: springTerm2023 datan är de aktiva klasserna, fallTerm2023 är de inaktiva_); hur du löser detta (via en extra 5:e route eller ett query string parameter filter) är upp till dig.
  - En route för att lägga till deltagare (namn och kontaktuppgifter) till en klass. När de läggs till bör deras betalningsstatus reggas som "pending". OBS: inget loginsystem ska byggas. Det ska vara max 20 deltagare per klass; 10 män ("ledare") och 10 kvinnor ("följare") (skicka ett error meddelande om man försöker lägga till fler)
  - En route för att uppdatera en deltagare (deras kontaktuppgifter/betalningsstatus)
  - En route för att ta bort en deltagare från en kurs

Filer som kan ignoreras (låt de bara ligga kvar):

- docker-compose.yml

## Krav för godkänt

Lämna in länken till ditt forkade repo senast tisdagen den 21/3. Du bör ha fått tillgång till en ny inlämningsuppgift tillagt på ItsLearning som heter "inlämningsuppgift 2" där du kan lämna in länken.

För att uppnå godkänt måste ditt API:

- Fungerara enligt ovanstående instruktioner med NodeJS version 18.12.1
- Ha någon form av error hantering som hindrar servern från att krascha om något går fel

För VG:

- Bra kodkvalitet & logisk filstruktur (MVC) i kodbasen
- Logiken i dina controllers
- REST API:et följer best practices när det kommer till REST API design
- Mongoose schemat följer best practices när det kommer till MongoDB databasdesign
- Ditt REST API ger korrekta responser även när saker går fel (t.ex. inkorrekta requests, requests för resurser som inte finns, oväntade errors)
