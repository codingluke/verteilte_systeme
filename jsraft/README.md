# Eine Raft simulation in JavaScript mit hilfe von Liferaft
Hier habe ich mit Hilfe eines in JavaScript implementieren RAFT Algorithmus, einen
kleinen Cluster, welcher nichts anderes macht als ständig eine election durch
zu führen. Es können nodes hinzugefügt oder entfernt werden ohne dass Fehler auftreten.

## Prerequisites

- NodeJS
- npm (Node Package Manager)

Es gibt mehrere Möglichkeiten Node und npm zu installieren. Hier eine Link dazu: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server

Danach müssen noch die verwendeten Packete installiert werden mit:
```bash
    npm install
```

## Den Cluster starten
In diesem Beispiel werden nicht mehr als 6 nodes zugelassen. Auch wurden feste IPs von 8081 - 8086 dafür vorgesehen.
Die einzelnen Nodes können folgendermassen (in einzelnen Terminals) gestartet werden.

```bash
  node index.js --port 8081
  node index.js --port 8082
  node index.js --port 8083
  node index.js --port 8084
  node index.js --port 8085
  node index.js --port 8086
```

Zusätzlich kann der Debug mode angestellt werden, dann sieht man nich nur die
resultate der Election sonder die gesamte Kommunikation.

```bash
  DEBUG=* node index.js --port 8082
  DEBUG=* node index.js --port 8081
  DEBUG=* node index.js --port 8083
  DEBUG=* node index.js --port 8084
  DEBUG=* node index.js --port 8085
  DEBUG=* node index.js --port 8086
```

## Quellen
- Liferaft in nodejs: https://github.com/unshiftio/liferaft
- Gute Infos und grafische Simulation https://raftconsensus.github.io/
