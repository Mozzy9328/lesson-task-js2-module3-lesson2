import { createHtml } from "./components/createHtml.js";
import { createMenu } from "./components/createMenu.js";
import { displayMessage } from "./components/displayMessage.js";
import { BaseURL } from "./components/settings.js";

const products = BaseURL + "/products";
createMenu();

(async function fetchProducts() {
	try {
		const response = await fetch(products);
		const json = await response.json();
		const data = json.data;

		createHtml(data);
	} catch (error) {
		displayMessage("error", error, ".message");
	}
})();
