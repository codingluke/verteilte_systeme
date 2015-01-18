# RESTful Webservice mit Node.js und MongoDB

## Prerequisites

- NodeJS
- npm (Node Package Manager)
- MongoDB

Es gibt mehrere Möglichkeiten Node und npm zu installieren. Hier eine Link dazu: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server

MongoDB kann einfach über die Konsole installiert werden.

```bash
    sudo apt-get install mongodb
```
MongoDB muss auf dem default port 27017 configuriert sein und eine db test enthalten

## installieren der dependencies.
Um die dependencies zu installieren muss man im Verzeichnis wo auch die Datei 'package.json' liegt, folgenden Befehl ausführen.

```bash
    npm install
```
Das Package für die Tests, "mocha", muss evt. global installiert werden.

```bash
    npm install -g mocha
```

## Express
Das Beispiel wurde mit hilfe des WebFrameworks ExpressJs umgesetzt. Infos über ExpressJs gibt es hier: http://expressjs.com/

## Mongoose
Die MongoDB wird mit Hilfe das Package mongoose gemacht: http://mongoosejs.com/

## Tests laufen lassen.
```bash
    mocha
```
Die Test sollte alle grün durchlaufen. Wenn sie Fehlschlagen, sollte die Datenbankverbindung überprüft werden.
## Starten des servers
```bash
    npm start
```
Dann sollte der Service unter "localhost:3000" zur verfügung stehen.

**Es sind momentan folgende Resourcen vorhanden:**

- **Get** /users
- **Post** /users
- **Get** /users/:id
- **Put** /users/:id
- **Delete** /users/:id

