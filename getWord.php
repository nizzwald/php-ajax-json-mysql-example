<?php
//Set connection (local)
$con = mysqli_connect('127.0.0.1','root','mysql');

//Set encoding to UTF-8 - this screwed me for hours because ASCII was being returned from the DB although the tables and DB are set to UTF-8.  In order for JSON to read characters such as umlauts, the data must be UTF-8
$con->set_charset('utf8');

if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }

mysqli_select_db($con,"learn");
//Check the amount of rows to randomize

//Create simple select - returns one value value - of course this could be returned as a full resultset too
$sql="SELECT * FROM satzverbindungen ORDER BY RAND() LIMIT 1";
$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result))
  {
	  $arr[] = $row;
  }

//Set the row data to a JSON objec to return
print (json_encode($arr));

//Close connection
mysqli_close($con);
?>