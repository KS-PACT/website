var cur_curriculum_id = -1;

// Add curriculum element to DB
function addCurriculumUtil() {
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);

	$.ajax({
		type: 'post',
		url: '/curriculum',
		data: { 'action': 'add',
						'name': $("#addName").val(),
						'description': $("#addDescription").val(),
						'link': $("#addLink").val(),
						'color': color },
		dataType: "json",
		success: function (data) {
			console.log("Status: ", data.status);
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly added a software resource.');
			}
			else {
				bootstrap_alert.error(data.status);
			}
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Get information from server
function getCurriculumInfo(id) {
	$.ajax({
		type: 'post',
		url: '/curriculum',
		data: { 'action': 'get info', 'id': id },
		dataType: "json",
		success: function (data) {
			$("#editName").val(data.info[0].name);
			$("#editDescription").val(data.info[0].description);
			$("#editLink").val(data.info[0].link);
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Remove curriculum element from DB
function removeCurriculum(id) {
	$.ajax({
		type: 'post',
		url: '/curriculum',
		data: { 'action': 'remove', 'id': id },
		dataType: "json",
		success: function (data) {
			console.log("Status: ", data.status);
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly removed a software resource.');
			}
			else {
				bootstrap_alert.error(data.status);
			}
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Update hardware on server
function updateCurriculum() {
	$.ajax({
		type: 'post',
		url: '/curriculum',
		data: { 'action': 'update',
						'id': cur_curriculum_id,
						'name': $('#editName').val(),
						'description': $('#editDescription').val(),
						'link': $('#editLink').val() },
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

// Enable all fields on edit modal
function enableEditModalFields() {
	$('#editName').prop('disabled', false);
	$('#editDescription').prop('disabled', false);
	$('#editLink').prop('disabled', false);
}

// Disable all fields on edit modal
function disableEditModalFields() {
	$('#editName').prop('disabled', true);
	$('#editDescription').prop('disabled', true);
	$('#editLink').prop('disabled', true);
}

// Handle notifications
bootstrap_alert = function() {}
bootstrap_alert.success = function(message) {
	$('#alert_placeholder').html('<div class="alert alert-success"><strong>Success!</strong><span> '+message+'</span></div>');
}
bootstrap_alert.error = function(message) {
	$('#alert_placeholder').html('<div class="alert alert-danger"><strong>Error:</strong><span> '+message+'</span></div>');
}

// Handle on click event functions
$('.add-curriculum-card').on('click', function() {
	$('#addCurriculumModal').modal('show');
});

$('.remove-btn').on('click', function() {
	console.log("Remove button was clicked");
	
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();
	
	removeCurriculum($(this).data("id"));
});

$('.add-submit-btn').on('click', function() {
	addCurriculumUtil();
});

$('.link-btn').on('click', function() {
	location.href = $("#editLink").val();
});

$('.edit-curriculum-card').on('click', function() {
	cur_curriculum_id = $(this).data("id");
	
	getCurriculumInfo($(this).data("id"));
	
	disableEditModalFields();
	
	$('#editCurriculumModal').modal('show');
});

$('.update-btn').on('click', function() {
	enableEditModalFields();
	
	$('.update-btn').hide();
	$('.reset-btn').show();
	$('.save-btn').show();
});

$('.reset-btn').on('click', function() {
	location.reload();
});

$('.save-btn').on('click', function() {
	updateCurriculum();
});