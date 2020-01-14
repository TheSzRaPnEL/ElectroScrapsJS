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
		<?php include "InitTeamDropDownMenu.php";?><br>
		Dodaj Gracza: <input id="PlayerNameInput" value="Nazwa Gracza">
		<button onclick="createPlayer();" style="margin-bottom:8px">Zapisz nowego Gracza</button>
		<script type="text/javascript">
			function createPlayer() {
				var playerName = document.getElementById('PlayerNameInput').value;
				var teamName = document.getElementById('TeamSelect')[document.getElementById('TeamSelect').selectedIndex].label;
				var schoolName = document.getElementById('SchoolSelect')[document.getElementById('SchoolSelect').selectedIndex].label;
				console.log(playerName);
				console.log(teamName);
				console.log(schoolName);
				
				jQuery.ajax({
				type: "GET",
				url: 'CreatePlayer.php',
				dataType: 'json',
				data: {schoolName: schoolName, teamName: teamName, playerName: playerName},

				success: function (obj, textstatus) {
					if( !('error' in obj) ) {
							console.log("Player created.");
						}
						else {
							console.log(obj.error);
						}
					}
				});
			}
			
			function refreshTeamDropDown() {
				let schoolIDvalue = document.getElementById('SchoolSelect')[document.getElementById('SchoolSelect').selectedIndex].value;
				
				jQuery.ajax({
				type: "GET",
				url: 'GetTeamDropDownMenu.php',
				dataType: 'json',
				data: {ttt: schoolIDvalue},

				success: function (obj, textstatus) {
					if( !('error' in obj) ) {
						var select = document.getElementById('TeamSelect');
						select.innerHTML="";
						var option = document.createElement('option');
						option.value = "";
						option.text =  "Wybierz Zespół";
						option.selected =  true;
						option.disabled =  true;
						select.add(option);
						obj.forEach(function(item) {
								var option = document.createElement('option');
								option.value = item["ID"];
								option.text =  item["Name"];
								select.add(option);
							});
						}
						else {
							console.log(obj.error);
						}
						refreshPlayerDropDown();
					}
				});
			}
			
			function refreshPlayerDropDown() {
				//
			}
		</script>
	</body>
</html>