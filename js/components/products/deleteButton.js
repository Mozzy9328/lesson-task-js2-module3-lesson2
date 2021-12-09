import { BaseURL } from "../settings.js";
import { getToken } from "../storage.js";

export default function deleteButton(id) {
	const deleteContainer = document.querySelector(".delete-container");

	deleteContainer.innerHTML += `<button type="button" class="delete">Delete</button>`;

	const deleteBtn = document.querySelector("button.delete");

	deleteBtn.addEventListener("click", async function () {
		console.log(id);

		const doDelete = confirm("Are you sure?");

		//if they click okay, then do this code
		if (doDelete) {
			const url = BaseURL + "/products/" + id;
			const token = getToken();

			const options = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const response = await fetch(url, options);
				const json = await response.json();

				location.href = "/";
				console.log(json);
			} catch (error) {
				console.log(error);
			}
		}
	});
}
