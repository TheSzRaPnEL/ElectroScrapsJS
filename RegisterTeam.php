<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>ElectroScrapsJS</title>
		<link rel="stylesheet" href="ElectroScrapsStyles.css">
	</head>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	
	<body>
		<?php include "GetSchoolDropDownMenu.php";?><br>
		Dodaj Zespół: <input id="TeamNameInput" value="Nazwa Zespołu">
		<button onclick="createTeam();" style="margin-bottom:8px">Zapisz nowy Zespół</button>
		<script type="text/javascript">
			function createTeam() {
				var teamName = document.getElementById('TeamNameInput').value;
				var schoolName = document.getElementById('SchoolSelect')[document.getElementById('SchoolSelect').selectedIndex].label;
				console.log(teamName);
				console.log(schoolName);
				
				jQuery.ajax({
				type: "GET",
				url: 'CreateTeam.php',
				dataType: 'json',
				data: {schoolName: schoolName, teamName: teamName},

				success: function (obj, textstatus) {
					if( !('error' in obj) ) {
							console.log("Team created.");
						}
						else {
							console.log(obj.error);
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