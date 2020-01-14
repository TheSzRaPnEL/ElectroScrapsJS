<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>ElectroScrapsJS</title>
		<link rel="stylesheet" href="ElectroScrapsStyles.css">
	</head>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	
	<body id="Body">
		<?php include "GetSchoolDropDownMenu.php";?><br><br>
		Dodaj Zespół: <input id="TeamNameInput" value="Nazwa Zespołu">
		<button onclick="createTeam();" style="margin-bottom:8px">Zapisz nowy Zespół</button>
		<script type="text/javascript">
			function createTeam() {
				var teamName = document.getElementById('TeamNameInput').value;
				var schoolName = document.getElementById('SchoolSelect')[document.getElementById('SchoolSelect').selectedIndex].label;
				console.log(teamName);
				console.log(schoolName);
				
				var body = document.getElementById('Body');
				
				jQuery.ajax({
				type: "GET",
				url: 'CreateTeam.php',
				dataType: 'json',
				data: {schoolName: schoolName, teamName: teamName},

				success: function (result) {
					if( result=="111" ) {
						body.innerHTML="Zespół został dodany.";
					}
					else if( result=="222" ) {
						body.innerHTML="Taki Zespół już istnieje.";
					}
					else {
						body.innerHTML="Błąd przy tworzeniu wpisu!";
					}
				}
				});
			}
			
			function refreshTeamDropDown() {
				//
			}
		</script>
	</body>
</html>