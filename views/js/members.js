function filterMembers() {
    var input = document.getElementById('searchField');
    var filter = input.value.toUpperCase();

	$( ".view-member-card" ).each(function() {
		var cardContent = $( this ).context;
		var cardName = cardContent.getElementsByTagName("h3")[0].innerHTML;

		if (cardName.toUpperCase().indexOf(filter) > -1) {
            cardContent.style.display = "";
        } else {
            cardContent.style.display = "none";
        }
	});
}

// Send user promote message
function promoteUserToAdmin(id) {
	$.ajax({
		type: 'post',
		url: '/members',
		data: { 'action': 'promote', 'id': id },
		dataType: "json",
		success: function (data) {
			if(data.status == "Success") {
				bootstrap_alert.success('You correctly promoted a user to admin.');
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

// Handle on click events for buttons
$('.promote-btn').on('click', function() {4
	// Ignore overarching action
	event.cancelBubble = true;
	if(event.stopPropagation) event.stopPropagation();

	promoteUserToAdmin($(this).data("id"));
});