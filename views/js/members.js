// Get user information from server
function showUserProfile(id) {
	$.ajax({
		type: 'post',
		url: '/members',
		data: { 'action': 'get profile', 'id': id },
		dataType: "json",
		success: function (data) {
			console.log(data.status);
			console.log(data.member_info);
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Send user promote message
function promoteUserToAdmin(id) {
	$.ajax({
		type: 'post',
		url: '/members',
		data: { 'action': 'promote', 'id': id },
		dataType: "json",
		success: function (data) {
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly promoted a user to admin.');
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
$('.get-info-btn').on('click', function() {
	showUserProfile($(this).data("id"));
});

// Handle on click events for buttons
$('.promote-btn').on('click', function() {
	promoteUserToAdmin($(this).data("id"));
});