# MapReduce WordCount für Hadoop

## Hadoop Installation
Dieses Beispiel folgt einem Tutorial von Yahoo, wofür eine virtuelle Machine auf Basis von vmware zur verfügung gestellt wird. Die auf der virtuellen Machine vorinstallierte Hadoop version ist die nummer 0.18.0, also bereits eine ältere.

- Tutorial: https://developer.yahoo.com/hadoop/tutorial/module3.html
- Virtuelle Machine: http://ydn.zenfs.com/site/hadoop/hadoop-vm-appliance-0-18-0_v1.zip
- VMware Player: http://www.vmware.com/pdf/vmware_player250.pdf

**Benutzer**

- vm-user: hadoop-user
- vm-passwort: hadoop

**Dateien auf vm kopieren**
```bash
    scp zu_kopierende_datei.txt -r hadoop-user@192.168.224.128:~/zielpfad/auf/vm
```

## Wie Kompilieren?
Es ist zu beachten das dem Kompiler das flag "-target 1.6" mitgegeben wird. Die es sollte also nicht höher als die Java Version 1.6 verwendet werden, da es sonst konfikte auf der vorinstallierten Version der VM gibt.

Die Dateien befinden sich unter dem ordern "src", es muss zusätzlich die library "ext/hadoop-0.18.0-core.jar" angegeben werden.

## Ausführen des Jobs auf Hadoop
1. Virtuelle Machine starten.
2. Eigenen Ordner in der VM erstellen

```bash
    mkdir meine_jobs
```

3. word_count.jar und kant.txt hochladen

```bash
    scp word_count.jar -r hadoop-user@192.168.224.128:~/meine_jobs/word_count.jar
    scp kant.txt -r hadoop-user@192.168.224.128:~/meine_jobs/kant.txt
```

4. Hadoop Starten

```bash
    ./start-hadoop
```

4. kant.txt in Hadoop HDFS kopieren

```bash
    hadoop dfs -mkdir /user/hadoop-user/input
    hadoop dfs -mkdir /user/hadoop-user/output
    hadoop dfs -put meine_jobs/kant.txt /user/hadoop-user/input
```

5. word_count.jar auf Hadoop ausführen

```bash
    hadoop jar meine_jobs/word_count.jar WordCount /user/hadoop-user/input /user/hadoop-user/output
```

6. Output anschauen.

```bash
    hadoop dfs -ls /user/hadoop-user/output
    hadoop dfs -cat /user/hadoop-user/output/part-00000
```

7. Output aus HDFS nach lokale Machine kopieren.

```bash
    hadoop dfs -get /user/hadoop-user/output/part-00000 meine_jobs/part-00000

    # Auf lokalem system
    scp hadoop-user@192.168.224.128:~/meine_jobs/part-00000 kant_word_count.txt
```









