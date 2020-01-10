<?php
require "DBCredits.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$schoolName = $_GET['schoolName'];
$teamName = $_GET['teamName'];


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
echo 'schoolID: '.$schoolID.'<br>';

if (!empty($schoolID) AND $schoolID!=-1) {
	$schoolExists=true;
}

//Check if SCHOOL exists
if (!$schoolExists) exit("SCHOOL DOESNT EXIST");

//Check if TEAM exist for given SCHOOL
$schoolTeamID=-1;
$sql = 'SELECT A.ID, A.Name, B.TeamID, B.SchoolID FROM Team A INNER JOIN PlayerTeamSchoolRelation B ON A.ID=B.TeamID WHERE A.Name="'.$teamName.'" AND B.SchoolID="'.$schoolID.'"';

$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$schoolTeamID=$row[TeamID];
	}
}
echo 'schoolteamid: '.$schoolTeamID.'<br>';
$teamBelongsToSchool=false;

if (!empty($schoolTeamID) AND $schoolTeamID!=-1) {
	$teamBelongsToSchool=true;
}

if (!$teamBelongsToSchool) {
	echo 'there is no such Team for this School - it will be created<br>';
	
	//CREATE NEW TEAM
	$sql = 'INSERT INTO Team (Name) VALUES ("'.$teamName.'")';
	if ($conn->query($sql) === TRUE) {
		$newTeamID = $conn->insert_id;
		echo "1st operation OK<br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	//CREATE NEW PLAYER-TEAM-SCHOOL relation with MOCKUP PLAYER ID 0
	$sql = 'INSERT INTO PlayerTeamSchoolRelation (SchoolID,TeamID,PlayerID) VALUES ('.$schoolID.','.$newTeamID.',0)';
	if ($conn->query($sql) === TRUE) {
		$newRelationID = $conn->insert_id;
		echo "2nd operation OK<br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error ."<br>";
	}
	
} else {
	echo 'there already is Team for this School - it will NOT be duplicated';
}

$conn->close();
?>