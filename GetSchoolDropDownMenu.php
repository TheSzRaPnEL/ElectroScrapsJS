<?php
require "DBCredits.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = 'SELECT Name, ID FROM School';

$result = $conn->query($sql);

echo '<select id=SchoolSelect onChange=refreshTeamDropDown()>';

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		echo '<option value="' . $row[ID] . '">' . $row[Name] . '</option>';
    }
} else {
    echo "siema";
}

echo '</select>';

$conn->close();
?>