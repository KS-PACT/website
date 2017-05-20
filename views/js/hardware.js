// Get user information from server
function getHardwareInfo(id) {
	$.ajax({
		type: 'post',
		url: '/hardware',
		data: { 'action': 'get info', 'id': id },
		dataType: "json",
		success: function (data) {
			$("#editSerialNum").val(data.info[0].serial_num);
			$("#editName").val(data.info[0].name);
			$("#editDescription").val(data.info[0].description);
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Add hardware element to database
function addHardware() {
	$.ajax({
		type: 'post',
		url: '/hardware',
		data: { 'action': 'add', 'serial_num': $("#addSerialNum").val(), 'name': $("#addName").val(), 'description': $("#addDescription").val() },
		dataType: "json",
		success: function (data) {
			console.log("Status: ", data.status);
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly added a hardware resource.');
			}
			else {
				bootstrap_alert.error(data.status);
			}
			
			$("#addSerialNum").val("");
			$("#addName").val("");
			$("#addDescription").val("");
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Remove hardware element from database
function removeHardware(id) {
	$.ajax({
		type: 'post',
		url: '/hardware',
		data: { 'action': 'remove', 'id': id },
		dataType: "json",
		success: function (data) {
			console.log("Status: ", data.status);
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly removed a hardware resource.');
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

// Handle notifications
bootstrap_alert = function() {}
bootstrap_alert.success = function(message) {
	$('#alert_placeholder').html('<div class="alert alert-success"><strong>Success!</strong><span> '+message+'</span></div>');
}
bootstrap_alert.error = function(message) {
	$('#alert_placeholder').html('<div class="alert alert-danger"><strong>Error:</strong><span> '+message+'</span></div>');
}

// Handle on click event functions
$('.edit-hardware-card').on('click', function() {
	getHardwareInfo($(this).data("id"));
	
	$("#editSerialNum").prop('disabled', true);
	$("#editName").prop('disabled', true);
	$("#editDescription").prop('disabled', true);
	
	$('#editHardwareModal').modal('show');
});

$('.add-hardware-card').on('click', function() {
	$('#addHardwareModal').modal('show');
});

$('.remove-btn').on('click', function() {
	// Ignore overarching action
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();
	
	removeHardware($(this).data("id"));
});

$('.add-submit-btn').on('click', function() {
	console.log("Clicked submit button on new hardware form");
	
	// Close the modal
	//$('#modal').modal('toggle');
	
	addHardware();
});