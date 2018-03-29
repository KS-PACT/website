// Add hardware element to database
function requestHardware() {
	$.ajax({
		type: 'post',
		url: '/hardware',
		data: { 'action': 'request',
						'id': cur_hardware_id,
						'start': $("#requestStart").val(),
						'end': $("#requestEnd").val() },
		dataType: "json",
		success: function (data) {
			console.log("Status: ", data.status);
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly requested a hardware resource.');
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

// Handle calendar buttons
$(function () {
	$('#datetimepicker6').datetimepicker();
	$('#datetimepicker7').datetimepicker({
		useCurrent: false //Important! See issue #1075
	});
	$("#datetimepicker6").on("dp.change", function (e) {
		$('#datetimepicker7').data("DateTimePicker").minDate(e.date);
	});
	$("#datetimepicker7").on("dp.change", function (e) {
		$('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
	});
});

// Handle on click events
$(".request-btn").on("click", function () {
	cur_hardware_id = $(this).data("id")
	
	// Ignore overarching action
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();
	
	$('#requestHardwareModal').modal('show');
});

$("#request-submit-btn").on("click", function () {
	console.log("Press submit request button");
	requestHardware();
});