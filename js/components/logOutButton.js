import { clearStorage } from "./storage.js";

export default function logOutButton() {
	const button = document.querySelector("#log-out");

	//This is so that we are 100% sure that the button actually exist in the HTML
	if (button) {
		button.addEventListener("click", function () {
			const doLogout = confirm("Are you sure you want to logout?");

			if (doLogout) {
				clearStorage();
				location.href = "/";
			}
		});
	}
}
