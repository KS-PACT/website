var cur_hardware_id = -1;

// Send accept message to server
function sendUserRequestAccept(id) {
	$.ajax({
		type: 'post',
		url: '/hardware_approval',
		data: { 'action': 'approve', 'id': id },
		dataType: "json",
		success: function (data) {
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly accepted a hardware request.');
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

// Send decline message to server
function sendUserRequestDecline(id) {
	$.ajax({
		type: 'post',
		url: '/hardware_approval',
		data: { 'action': 'decline', 'id': id },
		dataType: "json",
		success: function (data) {
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly declined a hardware request.');
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

// Send request for information about hardware request to server
function getHardwareRequestInfo(id) {
	$.ajax({
		type: 'post',
		url: '/hardware_approval',
		data: { 'action': 'get info', 'id': id },
		dataType: "json",
		success: function (data) {
			$("#requestHardwareName").val(data.info[0].item_name);
			$("#requestSerialNum").val(data.info[0].item_serial_num);
			$("#requestorName").val(data.info[0].requestor_name);
			$("#requestStart").val(data.info[0].checked_out);
			$("#requestEnd").val(data.info[0].return);
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
$('.hardware-approval-card').on('click', function() {
	cur_hardware_id = $(this).data("id");
	
	getHardwareRequestInfo(cur_hardware_id);
	
	$('#approvalHardwareModal').modal('show');
});

$('.approve-btn').on('click', function() {
	// Ignore overarching action
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();
	
	if(cur_hardware_id == -1) {
		sendUserRequestAccept($(this).data("id"));
	} else {
		sendUserRequestAccept(cur_hardware_id);
		cur_hardware_id = -1;
	}
});

$('.decline-btn').on('click', function() {
	// Ignore overarching action
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();
	
	if(cur_hardware_id == -1) {
		sendUserRequestDecline($(this).data("id"));
	} else {
		sendUserRequestDecline(cur_hardware_id);
		cur_hardware_id = -1;
	}
});