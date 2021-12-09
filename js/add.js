import { BaseURL } from "./components/settings.js";
import { displayMessage } from "./components/displayMessage.js";
import { createMenu } from "./components/createMenu.js";
import { getToken } from "./components/storage.js";

createMenu();

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const form = document.querySelector("form");
const message = document.querySelector(".message");

form.addEventListener("submit", submitProduct);

function submitProduct(event) {
	event.preventDefault();

	const titleValue = title.value.trim();
	const priceValue = parseFloat(price.value);
	const descriptionValue = description.value.trim();

	message.innerHTML = "";

	if (
		titleValue.length === 0 ||
		(priceValue.length === 0 && isNaN(priceValue)) ||
		descriptionValue === 0
	) {
		return displayMessage("error", "Not enough", ".message");
	}
	addProduct(titleValue, priceValue, descriptionValue);
}

async function addProduct(title, price, description) {
	const url = BaseURL + "/products";

	const data = JSON.stringify({
		data: {
			title: title,
			price: price,
			description: description,
		},
	});

	const token = getToken();

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const response = await fetch(url, options);
		const json = await response.json();
		console.log(json.data.attributes.createdAt);

		if (json.data.attributes.createdAt) {
			return displayMessage("success", "product Added", ".message");
		}
	} catch (error) {
		console.log(error);
	}
}
