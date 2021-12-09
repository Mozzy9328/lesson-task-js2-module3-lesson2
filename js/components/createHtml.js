export function createHtml(data) {
	const productContainer = document.querySelector(".products");

	productContainer.innerHTML = "";

	for (let i = 0; i < data.length; i++) {
		const items = data[i].attributes;
		const id = data[i].id;
		console.log(data);
		productContainer.innerHTML += `<div>
											<a class="product-id" href="edit.html?id=${id}">
												<h2>${items.title}</h2>
												<p>${items.price}</p>
												<p>${items.description}</p>
											</a>
		                                  </div>`;
	}
}
