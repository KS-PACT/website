var cur_hardware_id = -1;

// Get user information from server
function getHardwareInfo(id) {
	$.ajax({
		type: 'post',
		url: '/hardware',
		data: { 'action': 'get info', 'id': id },
		dataType: "json",
		success: function (data) {
			$("#editSerialNum").val(data.info[0].serial_num);
			$("#editName").val(data.info[0].name);
			$("#editDescription").val(data.info[0].description);
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Update hardware on server
function updateHardware() {
	$.ajax({
		type: 'post',
		url: '/hardware',
		data: { 'action': 'update',
						'id': cur_hardware_id,
						'serial_num': $('#editSerialNum').val(),
						'name': $('#editName').val(),
						'description': $('#editDescription').val() },
		dataType: "json",
		success: function (data) {
			console.log(data.status);
			location.reload();
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Enable all fields on edit modal
function enableEditModalFields() {
	$('#editSerialNum').prop('disabled', false);
	$('#editName').prop('disabled', false);
	$('#editDescription').prop('disabled', false);
}

// Disable all fields on edit modal
function disableEditModalFields() {
	$('#editSerialNum').prop('disabled', true);
	$('#editName').prop('disabled', true);
	$('#editDescription').prop('disabled', true);
}

// Handle on click event functions
$('.edit-hardware-card').on('click', function() {
	cur_hardware_id = $(this).data("id");
	
	getHardwareInfo($(this).data("id"));
	
	disableEditModalFields();
	
	$('#editHardwareModal').modal('show');
});

// Handle on click events
$('.update-btn').on('click', function() {
	enableEditModalFields();
	
	$('.update-btn').hide();
	$('.reset-btn').show();
	$('.save-btn').show();
});

$('.reset-btn').on('click', function() {
	location.reload();
});

$('.save-btn').on('click', function() {
	updateHardware();
});