<html>
 <head>
  <title>PHP-Beispiel</title>
 </head>
 <body>
   <h2>PHP-Beispiel 4: Angaben zum Html-File</h2>
   
   <?php 
       //Kommentar: $_Server ist assoziatives Array, 
       //Indizes sind in eckige Klammern zu setzen 
       $abspfad = dirname(__FILE__);
	   $pfad = $_SERVER["PHP_SELF"];
	   $dir = dirname($_SERVER["PHP_SELF"]);
	   $dateiname = basename($_SERVER["PHP_SELF"]);
	   
	   //$vollerDateipfad = $_SERVER["DOCUMENT_ROOT"] . $_SERVER["PHP_SELF"];
	   $vollerDateipfad = $_SERVER["SCRIPT_FILENAME"];
	   
	   
	   echo "<p>Absolut-Pfad:  ".$abspfad."</p>";
       echo "<p>Web-Pfad:  ".$dir."</p>"; 
       echo "<p>Datei-Name:  ".$dateiname."</p>"; 
	   echo "<p>Dokument-Pfad:  ".$pfad."</p><br />";
	   echo "<p>Voller Dateipfad: ".$vollerDateipfad."</p><br/>";
	   
       // Bei Funktionen sind Parameter in runde Klammern zu setzen
       echo "<p>Uhrzeit: ".date("d.m.Y ----- H:i:s")." Uhr</p>";
   ?>

 </body>
</html> 
