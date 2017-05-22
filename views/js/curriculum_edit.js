var cur_curriculum_id = -1;

// Get information from server
function getCurriculumInfo(id) {
	$.ajax({
		type: 'post',
		url: '/curriculum',
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
function updateCurriculum() {
	$.ajax({
		type: 'post',
		url: '/curriculum',
		data: { 'action': 'update',
						'id': cur_curriculum_id,
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

$('.link-btn').on('click', function() {
	location.href = $("#editLink").val();
});

$('.edit-curriculum-card').on('click', function() {
	cur_curriculum_id = $(this).data("id");
	
	getCurriculumInfo($(this).data("id"));
	
	disableEditModalFields();
	
	$('#editCurriculumModal').modal('show');
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
	updateCurriculum();
});