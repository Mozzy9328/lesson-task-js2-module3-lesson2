import logOutButton from "./logOutButton.js";
import { getUser } from "./storage.js";

export function createMenu() {
	const { pathname } = document.location;
	console.log(pathname);
	const username = getUser();

	const menu = document.querySelector(".menu-container");

	let authLink = `<a href="login.html" class="${
		pathname === "/login.html" ? "active" : ""
	}">Log in</a>`;

	if (username) {
		authLink = `<a href="add-product.html" class="${
			pathname === "/add-product.html" ? "active" : ""
		}">Add Product</a>
	    <button id="log-out">Log out: ${username}</button>`;
	}

	menu.innerHTML = `
	<div class = "menu">
	<a href="/" class="${
		pathname === "/" || pathname === "/index.html" ? "active" : ""
	}">Home</a>
	${authLink}
	</div>`;

	logOutButton();
}
