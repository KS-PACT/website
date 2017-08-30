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

$('.add-software').on('click', function() {
	$('#addSoftwareModal').modal('show');
});

$('.add-submit-btn').on('click', function() {
	addSoftware();
});