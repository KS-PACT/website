// Input checking functions
function checkBadLanguage(str) {
	return false;
}

function checkJavascript(str) {
	return false;
}

// Send data to server functions
function sendLoginRequest() {
	if(!checkJavascript($("#loginUsername").val())) {
		console.log("Login username does not consist of javascript");
	}

	if(!checkJavascript($("#loginPassword").val())) {
		console.log("Login password does not consist of javascript");
	}

	$.ajax({
		type: 'post',
		url: '/login',
		data: { 'action': 'login', 'username': $("#loginUsername").val(), 'password': $("#loginPassword").val() },
		dataType: "json",
		success: function (data) {
			if(data.status == "Success") {
				bootstrap_alert.success('You logged in correctly.');
			}
			else {
				bootstrap_alert.error(data.status);
			}
			clearLoginData();
			$('.login').hide();
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

function sendSignUpRequest() {
	// Make sure that the passwords are the same
	if($("#signUpPassword").val() != $("#signUpConfirmPassword").val()) {
		console.log("Passwords don't match")
	}

	if(!checkJavascript($("#signUpUsername").val())) {
		console.log("Sign up username does not consist of javascript");
	}

	if(!checkJavascript($("#signUpPassword").val())) {
		console.log("Sign up password does not consist of javascript");
	}

	var signUpRequestData = {
		'action': 'signup',
		'first_name': $("#signUpFirstName").val(),
		'last_name': $("#signUpLastName").val(),
		'email': $("#signUpEmail").val(),
		'username': $("#signUpUsername").val(),
		'password': $("#signUpPassword").val(),
		'school': $("#signUpSchool").val(),
		'bio': $("#signUpBio").val(),
		'picture': $("#signUpPic").val(),
		'grade': '{ ' + $("#signUpGrade").val() + ' }'
		};

	$.ajax({
		type: 'post',
		url: '/login',
		data: signUpRequestData,
		dataType: "json",
		success: function (data) {
			if(data.status == "Success") {
				bootstrap_alert.success('You have signed up successfully.');
			}
			else {
				bootstrap_alert.error(data.status);
			}
			clearSignUpData();
			$('.signup').hide();
		},
		error: function (xhr, status, err) {
			console.error('text status '+status+', err '+err);
		}
	});
}

// Functions to end form input process
function clearSignUpData() {
	$("#signUpFirstName").val("");
	$("#signUpLastName").val("");
	$("#signUpEmail").val("");
	$("#signUpUsername").val("");
	$("#signUpPassword").val("");
	$("#signUpSchool").val("");
	$("#signUpBio").val("");
	$("#signUpPic").val("");
	$("#signUpGrade").val("");
}

function clearLoginData() {
	$("#loginUsername").val("");
	$("#loginPassword").val("");
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
$('#show-login').on('click', function() {
	$('.login').show();
	$('.signup').hide();
	clearSignUpData();
});

$('#show-signup').on('click', function() {
	$('.login').hide();
	$('.signup').show();
	clearLoginData();
});

$('#login-btn').on('click', function() {
	sendLoginRequest();
});

$('#signup-btn').on('click', function() {
	sendSignUpRequest();
});