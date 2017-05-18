// Send data to server functions
function addHardware() {
	console.log("There is something wrong inside addHardware()");
	$.ajax({
		type: 'post',
		url: '/hardware_add',
		data: { 'action': 'add', 'serial_num': $("#serialNum").val(), 'name': $("#name").val(), 'description': $("#description").val() },
		//data: { 'action': 'add' },
		dataType: "json",
		success: function (data) {
			console.log("Status: ", data.status);
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly added a hardware resource.');
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
$('#submit-btn').on('click', function() {
	console.log("Submit button was clicked");
	addHardware();
});