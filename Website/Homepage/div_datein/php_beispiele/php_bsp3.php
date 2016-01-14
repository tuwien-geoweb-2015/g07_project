<html>
 <head>
 </head>
  <body>
  
   <h2>Php-Beispiel 3</h2>
   <p> Gerade Zahlen 1-10 fett, ungerade normal anzeigen.</p>

   <?php 
   
    // Variablen für Schleifendurchlauf
    $i = 1;        // Zähler
    $iMax = 10;    // Maximalzahl
	$summeGerade = 0;	// Summe aller geraden Zahlen
	$summeUngerade = 0;	// Summe aller ungeraden Zahlen
	
    // Schleife mit WHILE (Durchlauf bis Bedingung falsch)
    WHILE ( $i <= $iMax ) 
    	{
        if ( $i % 2 == 0 )  // % ist Modulo-Operator
        	{
				echo "<strong> ==> " . $i . "</strong><p />"; 
				$summeGerade = $summeGerade + $i;
			}
        else
            {
				echo $i . "<p />";#
				$summeUngerade = $summeUngerade + $i;
			}
            
 		$i = $i + 1;   // Zähler erhöhen
        }

	//echo "<br/><br/>Summe aller geraden Zahlen: <strong><font size='7'>" . $summeGerade . "</font></u></strong>";
	//echo "<br/><br/>Summe aller ungeraden Zahlen: <strong><font size='7'>" . $summeUngerade . "</font></u></strong>";
  
   ?>
   <br><br><br>
   <table border="1">
	<tr>
		<td>Summe gerader Zahlen</td>
		<td>Summe ungerader Zahlen</td>
	</tr>
		<td><?php echo "<div align='right'><strong>" . $summeGerade . "</strong></div>" ?></td>
		<td><?php echo "<div align='right'><strong>" . $summeUngerade . "</strong></div>" ?></td>
	<tr>
	
	</tr>
   </table>

 </body>
</html> 
