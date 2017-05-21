// Add software element to database
function addSoftware() {
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);

	$.ajax({
		type: 'post',
		url: '/software',
		data: { 'action': 'add', 'name': $("#addName").val(), 'description': $("#addDescription").val(), 'link': $("#addLink").val(), 'color': color },
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

// Remove software element from database
function removeSoftware(id) {
	$.ajax({
		type: 'post',
		url: '/software',
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

// Get user information from server
function getSoftwareInfo(id) {
	$.ajax({
		type: 'post',
		url: '/software',
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

// Update hardware on server
function updateSoftware() {
	$.ajax({
		type: 'post',
		url: '/software',
		data: { 'action': 'update',
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
$('.remove-btn').on('click', function() {
	// Ignore overarching action
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();
	
	removeSoftware($(this).data("id"));
});

$('.add-software-card').on('click', function() {
	$('#addSoftwareModal').modal('show');
});

$('.add-submit-btn').on('click', function() {
	addSoftware();
});

$('.link-btn').on('click', function() {
	location.href = $("#editLink").val();
});

$('.edit-software-card').on('click', function() {
	getSoftwareInfo($(this).data("id"));
	
	disableEditModalFields();
	
	$('#editSoftwareModal').modal('show');
});