export function createHtml(data) {
	const productContainer = document.querySelector(".products");

	productContainer.innerHTML = "";

	for (let i = 0; i < data.length; i++) {
		const items = data[i].attributes;
		console.log(data);
		productContainer.innerHTML += `<div>
		                                    <h2>${items.title}</h2>
		                                    <p>${items.price}</p>
		                                    <p>${items.description}</p>
		                                  </div>`;
	}
}
