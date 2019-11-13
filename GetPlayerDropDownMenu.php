<?php
require "DBCredits.php";

$teamID = htmlspecialchars($_GET["TeamID"]);

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = 'SELECT PlayerID, TeamID FROM PlayerTeamSchoolRelation WHERE TeamID=' . $teamID;

$result = $conn->query($sql);

echo '<select id=PlayerSelect>';

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		echo '<option value="' . $row[PlayerID] . '">' . $row[PlayerID] . '</option>';
    }
} else {
    echo "siema";
}

echo '</select>';

$conn->close();
?>