<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
	</head>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	
	<body id="Body">
		Dodaj Szkołę: <input type="SchoolName" id="SchoolNameInput" value="Nazwa Szkoły">
		<button id="CreateSchoolBtn" onclick="createSchool();" style="margin-bottom:8px">Zapisz nową Szkołę</button>
		<script type="text/javascript">
			function createSchool() {
				var schoolNameInput = document.getElementById('SchoolNameInput');
				var schoolIDvalue = schoolNameInput.value;
				
				var createSchoolBtn = document.getElementById('CreateSchoolBtn');
				var body = document.getElementById('Body');
				
				jQuery.ajax({
				type: "GET",
				url: 'CreateSchool.php',
				dataType: 'json',
				data: {schoolName: schoolIDvalue},

				success: function (result) {
					if( result=="111" ) {
						body.innerHTML="Szkoła została dodana.";
					}
					else if( result=="222" ) {
						body.innerHTML="Taka Szkoła już istnieje.";
					}
					else {
						body.innerHTML="Błąd przy tworzeniu wpisu!";
					}
				}
				});
			}
		</script>
	</body>
</html>