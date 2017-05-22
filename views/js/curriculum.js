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