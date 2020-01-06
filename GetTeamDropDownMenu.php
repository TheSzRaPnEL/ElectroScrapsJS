<?php
require "DBCredits.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$schoolID = $_GET['ttt'];

$sql = 'SELECT DISTINCT A.Name, A.ID FROM Team A INNER JOIN PlayerTeamSchoolRelation B ON A.ID=B.TeamID WHERE B.SchoolID='.$schoolID;

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