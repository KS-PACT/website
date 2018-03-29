// Send data to server functions
function getGradesList() {
	var gradesList = [];

	if($('#Kindergarden').is(':checked')) {
		gradesList.push('K');
	}

	if($('#1st').is(':checked')) {
		gradesList.push('1st');
	}

	if($('#2nd').is(':checked')) {
		gradesList.push('2nd');
	}

	if($('#3rd').is(':checked')) {
		gradesList.push('3rd');
	}

	if($('#4th').is(':checked')) {
		gradesList.push('4th');
	}

	if($('#5th').is(':checked')) {
		gradesList.push('5th');
	}

	if($('#6th').is(':checked')) {
		gradesList.push('6th');
	}

	if($('#7th').is(':checked')) {
		gradesList.push('7th');
	}

	if($('#8th').is(':checked')) {
		gradesList.push('8th');
	}

	if($('#9th').is(':checked')) {
		gradesList.push('9th');
	}

	if($('#10th').is(':checked')) {
		gradesList.push('10th');
	}

	if($('#11th').is(':checked')) {
		gradesList.push('11th');
	}

	if($('#12th').is(':checked')) {
		gradesList.push('12th');
	}

	if($('#CollegePrep').is(':checked')) {
		gradesList.push('College Prep');
	}

	if($('#AP').is(':checked')) {
		gradesList.push('AP');
	}

	return gradesList;
}

function updateProfile() {
	var startArray = '{';
	var endArray = '}';
	
	console.log(startArray.concat(getGradesList().join(", "), endArray));
	
	$.ajax({
		type: 'post',
		url: '/profile',
		data: { 'action': 'update',
						'first_name': $('#inputFirstName').val(),
						'last_name': $('#inputLastName').val(),
						'email': $('#inputEmail').val(),
						'username': $('#inputUsername').val(),
						'school': $('#inputSchool').val(),
						'bio': $('#inputBio').val(),
						'grade': startArray.concat(getGradesList().join(", "), endArray),
						'picture': $('#inputPic').val() },
		dataType: "json",
		success: function (data) {
			console.log(data.status);
			location.reload();
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Update whether fields are enabled or not
function enableAllFields() {
	$('#inputFirstName').prop("disabled", false);
	$('#inputLastName').prop("disabled", false);
	$('#inputEmail').prop("disabled", false);
	$('#inputUsername').prop("disabled", false);
	$('#inputSchool').prop("disabled", false);
	$('#inputBio').prop("disabled", false);
	$('#inputGrade').prop("disabled", false);
	$('#inputPic').prop("disabled", false);
}

// Handle on click events
$('#update-btn').on('click', function() {
	enableAllFields();
	
	$('#update-btn').hide();
	$('#reset-btn').show();
	$('#save-btn').show();
});

$('#reset-btn').on('click', function() {
	location.reload();
});

$('#save-btn').on('click', function() {
	updateProfile();
});