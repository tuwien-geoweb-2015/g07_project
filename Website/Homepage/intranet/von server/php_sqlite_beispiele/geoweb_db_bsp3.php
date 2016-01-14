<h2>Php-SQLite-Beispiel 3</h2>

<?php

// SQLite3-Datenbank oeffnen (die php-datei liefert Datenbank-Objekt $db)
include 'geoweb_db_open.php';

// Abfrage festlegen, Bundesland-Tabelle lnd_oes (land-id, land)
$sql = 'SELECT * FROM bez_oes';

// Abfrage durchfuehren, query-Methode liefert Ergebnis-Objekt (Recordset)
$result = $db->query($sql) or 
			die ('uuups! etwas ist schiefgelaufen: '.$db->lastErrorMsg());

// Erste Zeile des Abfrageergebnisses lesen
$zeile = $result->fetchArray(); 

// Ergebnis (Zeile in assoziativem Array) verarbeiten
echo 'Abfrage: ' . $sql . '<br />';
echo '1. Zeile: ' . $zeile["bez_id"] . 
     " " . $zeile["bezirk"] . "<br /><br />";
     
echo 'Congrats! Die Bezirksabfrage war erfolgreich';

// Datenbank schliessen
include 'geoweb_db_close.php';

?> 