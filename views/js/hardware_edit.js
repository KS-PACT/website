// Send data to server functions
function updateProfile() {
	console.log("Before send profile data");
	
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
						'grade': $('#inputGrade').val(),
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
	console.log("After send profile data");
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
	console.log("Save profile button");
	
	updateProfile();
});