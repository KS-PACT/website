// Send request for information about hardware request to server
function getHardwareRequestInfo(id) {
	$.ajax({
		type: 'post',
		url: '/my_hardware_requests',
		data: { 'action': 'get info', 'id': id },
		dataType: "json",
		success: function (data) {
			$("#myRequestHardwareName").val(data.info[0].item_name);
			$("#myRequestSerialNum").val(data.info[0].item_serial_num);
			$("#curRequestStart").val(data.info[0].checked_out);
			$("#curRequestEnd").val(data.info[0].return);
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}