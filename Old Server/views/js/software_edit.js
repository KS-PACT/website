var cur_software_id = -1;

// Get user information from server
function getSoftwareInfo(id) {
	$.ajax({
		type: 'post',
		url: '/software',
		data: { 'action': 'get info', 'id': id },
		dataType: "json",
		success: function (data) {
			$("#editName").val(data.info[0].name);
			$("#editDescription").val(data.info[0].description);
			$("#editLink").val(data.info[0].link);
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Update hardware on server
function updateSoftware() {
	$.ajax({
		type: 'post',
		url: '/software',
		data: { 'action': 'update',
						'id': cur_software_id,
						'name': $('#editName').val(),
						'description': $('#editDescription').val(),
						'link': $('#editLink').val() },
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
	$('#editName').prop('disabled', false);
	$('#editDescription').prop('disabled', false);
	$('#editLink').prop('disabled', false);
}

// Disable all fields on edit modal
function disableEditModalFields() {
	$('#editName').prop('disabled', true);
	$('#editDescription').prop('disabled', true);
	$('#editLink').prop('disabled', true);
}

// Handle on click event functions
$('.link-btn').on('click', function() {
	location.href = $("#editLink").val();
});

$('.edit-software-card').on('click', function() {
	cur_software_id = $(this).data("id");
	
	getSoftwareInfo($(this).data("id"));
	
	disableEditModalFields();
	
	$('#editSoftwareModal').modal('show');
});

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
	updateSoftware();
});

$(".modal").on("hidden.bs.modal", function () {
    location.reload();
});