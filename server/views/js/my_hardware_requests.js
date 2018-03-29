var cur_hardware_id = -1;

// Send canceled message to server
function sendUserRequestCancel(id) {
	$.ajax({
		type: 'post',
		url: '/my_hardware_requests',
		data: { 'action': 'cancel', 'id': id },
		dataType: "json",
		success: function (data) {
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly canceled a hardware request.');
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

// Handle on click events for buttons
$('.my-hardware-request-card').on('click', function() {
	cur_hardware_id = $(this).data("id");
	
	getHardwareRequestInfo(cur_hardware_id);
	
	$('#myHardwareRequestsModal').modal('show');
});

$('.cancel-btn').on('click', function() {
	if(cur_hardware_id == -1) {
		// Ignore overarching action
		event.cancelBubble = true;
		if(event.stopPropagation) event.stopPropagation();
		
		sendUserRequestCancel($(this).data("id"));
	} else {
		sendUserRequestCancel(cur_hardware_id);
		cur_hardware_id = -1;
	}
});