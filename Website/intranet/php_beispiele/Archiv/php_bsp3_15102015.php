<html>
 <head>
 </head>
  <body>
  
   <h2>Php-Beispiel 3</h2>
   <p> Gerade Zahlen 1-10 fett, ungerade normal anzeigen.</p>

   <?php 
   
    // Variablen f�r Schleifendurchlauf
    $i = 1;        // Z�hler
    $iMax = 11;    // Maximalzahl
    
    // Schleife mit WHILE (Durchlauf bis Bedingung falsch)
    WHILE ( $i < $iMax ) 
    	{
        if ( $i % 2 == 0 )  // % ist Modulo-Operator
        	{ echo "<strong> ==> " . $i . "</strong><br />"; }
        else
            { echo $i . "<br />"; }
            
 		$i = $i + 1;   // Z�hler erh�hen
        }
  
   ?>   

 </body>
</html> 
