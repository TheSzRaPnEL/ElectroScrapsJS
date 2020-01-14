<?php
require "DBCredits.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$conn->set_charset("utf8");

$schoolName = $_GET['schoolName'];

//Get SCHOOL ID by NAME
$schoolID=-1;
$schoolExists=false;
$sql = 'SELECT ID,Name FROM School WHERE Name="'.$schoolName.'"';

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		$schoolID=$row[ID];
    }
}
//echo 'schoolID: '.$schoolID.'<br>';

if (!empty($schoolID) AND $schoolID!=-1) {
	$schoolExists=true;
}

//Check if SCHOOL exists
if (!$schoolExists) {
	//echo 'there is no such School Name - it will be created';
	
	//CREATE NEW SCHOOL
	$sql = 'INSERT INTO School (Name) VALUES ("'.$schoolName.'")';
	if ($conn->query($sql) === TRUE) {
		$newSchoolID = $conn->insert_id;
		//echo "1st operation OK";
		$result=111;
	} else {
		//echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
} else {
	$result=222;
	//echo 'there already is School with this Name - it will NOT be duplicated';
}

echo json_encode($result);

$conn->close();
?>