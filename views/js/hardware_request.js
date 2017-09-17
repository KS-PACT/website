var disabled_dates = [];

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

// Get hardware request dates
function getDisabledDates() {
	$.ajax({
		type: 'post',
		url: '/hardware',
		data: { 'action': 'get disabled dates',
						'item_id': cur_hardware_id },
		dataType: "json",
		success: function (data) {
			//disabled_dates = data.info;
			disabled_dates = ["05/26/2017 00:00"];
			for(var i = 0; i < data.info.length; i++)
			{
				console.log(data.info[i]);
			}

			if(data.status == "Success") {
				bootstrap_alert.success('Got info.');
			} else {
				bootstrap_alert.error(data.status);
			}
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Handle calendar buttons
/*$(function () {
	$('#datetimepicker6').datetimepicker({
		disabledDates: ["05/26/2017 00:00"]
	});
  	$('#datetimepicker7').datetimepicker({
		useCurrent: false, //Important! See issue #1075
		disabledDates: disabled_dates
  	});
  	$("#datetimepicker6").on("dp.change", function (e) {
  		$('#datetimepicker7').data("DateTimePicker").minDate(e.date);
  	});
  	$("#datetimepicker7").on("dp.change", function (e) {
  		$('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
  	});
});*/

$('#datetimepicker6').datetimepicker({
	disabledDates: ["05/26/2017 01:00 AM"]
});

$('#datetimepicker7').datetimepicker({
	useCurrent: false, //Important! See issue #1075
	disabledDates: disabled_dates
});

$("#datetimepicker6").on("dp.change", function (e) {
	$('#datetimepicker7').data("DateTimePicker").minDate(e.date);
});

$("#datetimepicker7").on("dp.change", function (e) {
	alert(disabled_dates);
	$('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
});

// Handle on click events
$(".request-btn").on("click", function () {
	cur_hardware_id = $(this).data("id")
	
	// Ignore overarching action
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();
	
	getDisabledDates();
	
	$('#datetimepicker').empty().datetimepicker({})
	
	$('#datetimepicker7').datetimepicker({
		useCurrent: false, //Important! See issue #1075
		disabledDates: disabled_dates
	});
	
	$('#requestHardwareModal').modal('show');
});

$("#request-submit-btn").on("click", function () {
	console.log("Press submit request button");
	requestHardware();
});