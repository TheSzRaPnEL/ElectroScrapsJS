<?php
	$playerID = floatval($_POST['playerID']);
	$score = floatval($_POST['points']);
	$gameToken = floatval($_POST['token']);

	include 'DBCredits.php';

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	// Add points for a team
	$gameTime = time();
	$sql = "INSERT INTO Game (time, device, token) VALUES (". $gameTime . ", 'Web', ". $gameToken .")";

	if ($conn->query($sql) === TRUE) {
		$gameInsert_id = $conn->insert_id;
		echo "1st operation OK";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	$sql = "INSERT INTO Activity (type, value, param, time) VALUES ('Points', ". $score .", 'GameEnd', ". $gameTime .")";

	if ($conn->query($sql) === TRUE) {
		$activityInsert_id = $conn->insert_id;
		echo "2nd operation OK";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	$sql = "INSERT INTO GameActivity (gameID, activityID, playerID) VALUES (". $gameInsert_id .", ". $activityInsert_id .", ". $playerID .")";

	if ($conn->query($sql) === TRUE) {
		echo "3rd operation OK";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();

	$success = "1";

	$returnVars = array();
	$returnVars['success'] = $success;
	$returnString = http_build_query($returnVars);
	echo $returnString;
?>