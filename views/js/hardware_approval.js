// Send accept message to server
function sendUserRequestAccept(id) {
	$.ajax({
		type: 'post',
		url: '/hardware_approval',
		data: { 'action': 'approve', 'id': id },
		dataType: "json",
		success: function (data) {
			console.log(data.status);
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
			console.log(data.status);
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Handle on click events for buttons
$('.btn.approve').on('click', function() {
	sendUserRequestAccept($(this).data("id"));
});

$('.btn.decline').on('click', function() {
	sendUserRequestDecline($(this).data("id"));
});