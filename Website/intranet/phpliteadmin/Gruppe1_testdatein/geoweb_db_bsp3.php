<h2><font color="#000080" face="Arial" style="font-size: 9pt">Php-SQLite-Beispiel 3</h2>

<?php

// SQLite3-Datenbank oeffnen (die php-datei liefert Datenbank-Objekt $db)
include 'geoweb_db_open.php';

// Abfrage festlegen, Bundesland-Tabelle lnd_oes (land-id, land)
$sql = 'SELECT * FROM bezirksgrenzeogd';

// Abfrage durchfuehren, query-Methode liefert Ergebnis-Objekt (Recordset)
$result = $db->query($sql) or 
			die ('Fehler bei Abfrage: '.$db->lastErrorMsg());

// Erste Zeile des Abfrageergebnisses lesen
$row = $result->fetchArray();


// Ergebnis (Zeile in assoziativem Array) verarbeiten
echo 'Abfrage: ' . $sql . '<br />';
echo '1. Zeile: ' . $zeile[BEZNR] . 
     " " . $row["NAMEG"] . "<br /><br />";
     
echo 'Befehl erfolgreich ausgef&uuml;hrt';

// Datenbank schliessen
include 'geoweb_db_close.php';

?> 