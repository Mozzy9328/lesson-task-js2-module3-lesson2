import { createMenu } from "./components/createMenu.js";
import { displayMessage } from "./components/displayMessage.js";
import deleteButton from "./components/products/deleteButton.js";
import { BaseURL } from "./components/settings.js";
import { getToken } from "./components/storage.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
	document.location.href = "/";
}

const productUrl = BaseURL + "/products/" + id;

console.log(productUrl);

const form = document.querySelector("form");
const idInput = document.querySelector("#id");
const loading = document.querySelector(".loading");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message");

(async function () {
	try {
		const response = await fetch(productUrl);
		const json = await response.json();
		console.log(json);

		// In order to add the values retrieved in the form
		title.value = json.data.attributes.title;
		price.value = json.data.attributes.price;
		description.value = json.data.attributes.description;
		idInput.value = json.data.id;

		deleteButton(json.data.id);
	} catch (error) {
		console.log(error);
	} finally {
		loading.style.display = "none";
		form.style.display = "block";
	}
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
	event.preventDefault();

	message.innerHTML = "";

	const titleValue = title.value.trim();
	const priceValue = parseFloat(price.value);
	const descriptionValue = description.value.trim();
	const idValue = idInput.value;

	message.innerHTML = "";

	if (
		titleValue.length === 0 ||
		(priceValue.length === 0 && isNaN(priceValue)) ||
		descriptionValue === 0
	) {
		return displayMessage("error", "Something went wrong", ".message");
	}

	updateProduct(titleValue, priceValue, descriptionValue, idValue);
}

async function updateProduct(title, price, description, id) {
	const url = BaseURL + "/products/" + id;

	const data = JSON.stringify({
		data: {
			title: title,
			price: price,
			description: description,
		},
	});
	const token = getToken();

	const options = {
		method: "PUT",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const response = await fetch(url, options);
		const json = await response.json();
		console.log(json);

		if (json.data.attributes.createdAt) {
			displayMessage("success", "product Updated", ".message");
		}

		if (json.data.error) {
			displayMessage("error", json.data.error, ".message");
		}
	} catch (error) {
		console.log(error);
	}
}
