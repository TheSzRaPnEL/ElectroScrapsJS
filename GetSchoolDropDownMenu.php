<?php
require "DBCredits.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$conn->set_charset("utf8");

$sql = 'SELECT A.Name, A.ID FROM School A';

$result = $conn->query($sql);

echo '<select id=SchoolSelect onChange=refreshTeamDropDown()>';

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		echo '<option value="' . $row[ID] . '">' . $row[Name] . '</option>';
    }
}

echo '</select>';

$conn->close();
?>