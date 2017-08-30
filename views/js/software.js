function filterSoftware() {
    var input = document.getElementById('searchField');
    var filter = input.value.toUpperCase();

	$( ".edit-software-card" ).each(function() {
		var cardContent = $( this ).context;
		var cardName = cardContent.getElementsByTagName("h3")[0].innerHTML;

		if (cardName.toUpperCase().indexOf(filter) > -1) {
            cardContent.style.display = "";
        } else {
            cardContent.style.display = "none";
        }
	});
}

// Remove software element from database
function removeSoftware(id) {
	$.ajax({
		type: 'post',
		url: '/software',
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
$('.remove-btn').on('click', function() {
	// Ignore overarching action
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();
	
	removeSoftware($(this).data("id"));
});