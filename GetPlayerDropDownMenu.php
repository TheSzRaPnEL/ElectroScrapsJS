<?php
require "DBCredits.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$conn->set_charset("utf8");

$teamID = $_GET['ttt'];

$sql = 'SELECT A.Name, A.ID FROM Player A INNER JOIN PlayerTeamSchoolRelation B ON A.ID=B.PlayerID WHERE B.TeamID='.$teamID;

$result = $conn->query($sql);

$resultArray = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		array_push($resultArray,array('ID'=>$row[ID], 'Name'=>$row[Name]));
    }
}

echo json_encode($resultArray);

$conn->close();
?>