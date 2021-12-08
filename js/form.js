import { displayMessage } from "./components/displayMessage.js";
import { BaseURL } from "./components/settings.js";
import { saveToken, saveUser } from "./components/storage.js";

const form = document.querySelector("form");
const username = document.querySelector("#name");
const password = document.querySelector("#password");
const message = document.querySelector(".message");

form.addEventListener("submit", submitForm);

function submitForm(event) {
	event.preventDefault();

	message.innerHTML = "";

	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();

	if (usernameValue.length === 0 || passwordValue.length === 0) {
		return displayMessage("warning", "Invalid values", ".message");
	}

	callApi(usernameValue, passwordValue);
}

async function callApi(username, password) {
	const url = BaseURL + "/auth/local";

	const data = JSON.stringify({ identifier: username, password: password });

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const response = await fetch(url, options);
		const json = await response.json();
		console.log(json);
		if (json.error) {
			displayMessage("error", json.error.message, ".message");
		}
		if (json.user) {
			displayMessage("success", "success", ".message");

			saveToken(json.jwt);
			saveUser(json.user);

			location.href = "/";
		}
	} catch (error) {
		console.log(error);
	}
}
