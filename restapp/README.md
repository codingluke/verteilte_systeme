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
Nun da npm installiert ist, muss man einfach im verzeichnis wo auch die Datei 'package.json' liegt folgenden Befehl ausführen.

```bash
    npm install
```
Nun werden alle benötigten nodejs packages heruntergeladen und installiert.
das Package für die tests "mocha", muss evt. global installiert werden.

```bash
    npm install -g mocha
```

## Tests laufen lassen.
```bash
    mocha
```
## Starten des servers
```bash
    npm start
```
Dann sollte der Service unter "localhost:3000" zur verfügung stehen.

**Es sind momentan folgende Resourcen vorhanden:**

**Get** /users
**Post** /users
**Get** /users/:id
**Put** /users/:id
**Delete** /users/:id

