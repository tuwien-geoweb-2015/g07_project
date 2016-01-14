<html>
 <head>
 </head>
  <body>
  
   <h2>Php-Beispiel 2</h2>

   <?php 
    // Variablen mit einem Wert (Varaiablennamen beginnen immer mit $)
    $Grp_Text = "PHP-Beispiel";		// Variable mit Text (String)
	$Grp_Zahl = 2;           // Variable mit Zahl
    
    // Texte können mit Verknüpfungsoperator (.) zusammengefügt werden
    echo "<p>Willkommen beim " . $Grp_Text . "-" . $Grp_Zahl . "</p>"; 

    // Arrays speichern mehrere Werte in einer Variable 
	$zahlen = array(10,15,832,123);
	$namen = array("Agnes","Lindiella", "Florian");
	
	// Zugriff auf Elemente des Arrays mit numerischen Index (beginnend bei 0)
    echo "<p>Dritte Zahl des Arrays: ".$zahlen[2]."</p>"; 
    echo "<p>Zweiter Text des Arrays: ".$namen[1]."</p>"; 

    // Assoziative Arrays mit Schlüssel (String) als Index
    $alter = array("Florian"=>26, "Maria"=>30, "Joe"=>34); 
    echo "<p>Alter von Florian: ".$alter["Florian"]."</p>"; 
    
   ?>   

 </body>
</html> 
