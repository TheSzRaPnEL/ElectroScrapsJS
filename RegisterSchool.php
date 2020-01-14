<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
	</head>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	
	<body>
		Dodaj Szkołę: <input type="SchoolName" id="SchoolNameInput" value="Nazwa Szkoły">
		<button onclick="createSchool();" style="margin-bottom:8px">Zapisz nową Szkołę</button>
		<script type="text/javascript">
			function createSchool() {
				let schoolIDvalue = document.getElementById('SchoolNameInput').value;
				
				jQuery.ajax({
				type: "GET",
				url: 'CreateSchool.php',
				dataType: 'json',
				data: {schoolName: schoolIDvalue},

				success: function (obj, textstatus) {
					if( !('error' in obj) ) {
							console.log("School created.");
						}
						else {
							console.log(obj.error);
						}
					}
				});
			}
		</script>
	</body>
</html>