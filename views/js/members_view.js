// Get user information from server
function getUserInfo(id) {
	$.ajax({
		type: 'post',
		url: '/members',
		data: { 'action': 'get info', 'id': id },
		dataType: "json",
		success: function (data) {
			$("#viewFirstName").val(data.info[0].first_name);
			$("#viewLastName").val(data.info[0].last_name);
			$("#viewUsername").val(data.info[0].username);
			$("#viewEmail").val(data.info[0].email);
			$("#viewSchool").val(data.info[0].school);
			$("#viewBio").val(data.info[0].bio);
			if(!data.info[0].picture) {
				$("#viewPicture").val(data.info[0].picture);
			}
			$("#viewGradeLevel").val(data.info[0].grade_level);
			$("#viewPriv").val(data.info[0].privilege);
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Disable all fields on edit modal
function disableEditModalFields() {
	$("#viewFirstName").prop('disabled', true);
	$("#viewLastName").prop('disabled', true);
	$("#viewUsername").prop('disabled', true);
	$("#viewEmail").prop('disabled', true);
	$("#viewSchool").prop('disabled', true);
	$("#viewBio").prop('disabled', true);
	$("#viewPicture").prop('disabled', true);
	$("#viewGradeLevel").prop('disabled', true);
	$("#viewPriv").prop('disabled', true);
}

// Handle on click events for buttons
$('.view-member-card').on('click', function() {
	getUserInfo($(this).data("id"));
	
	disableEditModalFields();
	
	$('#viewMemberModal').modal('show');
});