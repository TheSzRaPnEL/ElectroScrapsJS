<?php
require "DBCredits.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$conn->set_charset("utf8");

$schoolName = $_GET['schoolName'];
$teamName = $_GET['teamName'];
$playerName = $_GET['playerName'];


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

if (! empty($schoolID) AND $schoolID!=-1) {
	$schoolExists=true;
}

//Check if SCHOOL exists
if (! $schoolExists) exit("SCHOOL DOESNT EXIST");
	
//Get TEAM ID by NAME
$teamID=-1;
$teamExists=false;
$sql = 'SELECT ID,Name FROM Team WHERE Name="'.$teamName.'"';

$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$teamID=$row[ID];
	}
}

echo 'teamID: '.$teamID.'<br>';

if (! empty($teamID) AND $teamID!=-1) {
	$teamExists=true;
}

if (! $teamExists) exit("TEAM DOESNT EXIST");

//Check if TEAM exist for given SCHOOL
$schoolTeamID=-1;
$sql = 'SELECT SchoolID,TeamID FROM PlayerTeamSchoolRelation WHERE TeamID="'.$teamID.'" AND SchoolID="'.$schoolID.'"';

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

if (! $teamExists OR ! $teamBelongsToSchool) exit("TEAM FOR GIVE SCHOOL DOESNT EXIST");

//Get PLAYER ID by PLAYER NAME + TEAM ID + SCHOOL ID
$sql = 'SELECT A.ID, A.Name, B.PlayerID, B.TeamID, B.SchoolID FROM Player A INNER JOIN PlayerTeamSchoolRelation B ON A.ID=B.PlayerID WHERE A.Name="'.$playerName.'" AND B.TeamID="'.$teamID.'" AND B.SchoolID="'.$schoolID.'"';

$result = $conn->query($sql);

$resultArray = array();

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		array_push($resultArray,$row[ID]);
	}
}

if (sizeof($resultArray)==0) {
	echo 'there is no such Player Name - it will be created';
	
	//CREATE NEW PLAYER
	$sql = 'INSERT INTO Player (Name) VALUES ("'.$playerName.'")';
	if ($conn->query($sql) === TRUE) {
		$newPlayerID = $conn->insert_id;
		echo "1st operation OK";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	//CREATE NEW PLAYER-TEAM-SCHOOL relation
	$sql = 'INSERT INTO PlayerTeamSchoolRelation (SchoolID,TeamID,PlayerID) VALUES ('.$schoolID.','.$teamID.','.$newPlayerID.')';
	if ($conn->query($sql) === TRUE) {
		$newRelationID = $conn->insert_id;
		echo "2nd operation OK";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
} else {
	echo 'there already is Player with this Name - it will NOT be duplicated';
}

$conn->close();
?>