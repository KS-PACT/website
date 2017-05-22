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

$('.add-hardware-card').on('click', function() {
	$('#addHardwareModal').modal('show');
});

$('.add-submit-btn').on('click', function() {
	addHardware();
});