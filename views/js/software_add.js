// Send data to server functions
function addSoftware() {
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);

	$.ajax({
		type: 'post',
		url: '/software_add',
		data: { 'action': 'add', 'name': $("#name").val(), 'description': $("#description").val(), 'link': $("#link").val(), 'color': color },
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
	addSoftware();
});