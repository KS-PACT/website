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

// Handle on click event functions
$('.add-curriculum').on('click', function() {
	$('#addCurriculumModal').modal('show');
});

$('.add-submit-btn').on('click', function() {
	addCurriculumUtil();
});