<html>
 <head>
  <title>PHP-Beispiel Formular</title>
 </head>
 <body>
   <h2>PHP-Beispiel 5: Einfaches Html-Formular</h2>
   
		<form action="php_bsp5_response.php" method="post" target="_self">
			Dein Name:  <input type="text" name="name" /> <br /><br /><br />
			Dein Alter: <input type="text" name="alter" />&nbsp; 
			           <select name="genauigkeit" size="1">
			           	<option value="genau"> genau </option>
			           	<option value="circa"> circa </option>
			           </select> <br /><br /><br />

			<input type="submit" value="Absenden"/>
		</form>

 </body>
</html> 
