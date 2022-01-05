const form = document.getElementById('form')
const username = document.getElementById('Username')
const email = document.getElementById('Email')
const password1 = document.getElementById('Password')
const password2 = document.getElementById('Confirm-Password')

form.addEventListener('submit', function (event) {
	event.preventDefault();
	checkInput([username, email, password1, password2]);

	if (!validateEmail(email.value.trim())) {
		showError(email, 'Please enter @gmail.com');
	} else {
		showSuccess(email);
	}
	checkPassword(password1, password2);
	checkInputLength(username, 6, 15);
	checkInputLength(password1, 8)
});

function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small')
	small.innerText = message;
}

function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function checkInput(inputArray) {
	inputArray.forEach(function (input) {
		if (input.value.trim() === '') {
			showError(input, `Please enter ${input.id}`);
		} else {
			showSuccess(input);
		}
	});
}

function checkPassword(password1, password2) {
	if (password1.value !== password2.value) {
		showError(password2, 'Passwords do not match');
	}

}

function checkInputLength(input, min, max) {
	if (input.value.length < min) {
		showError(input, `${input.id} Must more ${min} letter`)
	} else if (input.value.length > max) {
		showError(input, `${input.id} No more than ${max} letter`)

	} else {
		showSuccess(input);
	}
}