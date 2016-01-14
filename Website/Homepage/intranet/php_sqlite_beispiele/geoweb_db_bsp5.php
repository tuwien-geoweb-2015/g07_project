<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html"; charset="ISO-8859-1">
  <title>Geoweb - DemoMap</title>
</head>
<body>

<h2>Php-SQLite-Beispiel 5</h2>

<?php

// Datenbank öffnen, Tabellenfunktion (einmalig) einbinden
include_once 'geoweb_db_open.php';
include_once 'geoweb_db_table_function.php';

// Abfrage festlegen (Bundesländer)
$Sql = 'SELECT * FROM lnd_oes';

// Abfrage durchführen
$result = $db->query($Sql) or 
          die ('Fehler bei Abfrage: '.$db->lastErrorMsg());

// Abfrage anzeigen
echo 'Abfrage: ' . $Sql . '<br /><br />Ergebnis:';

// Abfrageergebnis als Tabelle ausgeben
@geoweb_db_table($result);

// Datenbank schließen
include 'geoweb_db_close.php';

?> 
</body></html>