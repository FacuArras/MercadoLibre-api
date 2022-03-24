function mostrarResultados(results) {
  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#result-item-template");

  for (const r of results) {
    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = r.title;

    const conditionEl = template.content.querySelector(
      ".result-item-condition"
    );
    conditionEl.textContent = r.condition;

    const sellEl = template.content.querySelector(".result-item-sell-count");
    sellEl.textContent = "Vendidos: " + r.sold_quantity;

    const priceEl = template.content.querySelector(".result-item-price");
    priceEl.textContent = "$" + r.price;

    const resultsCountEl = document.querySelector(".results-count");
    resultsCountEl.textContent = results.length;

    const imgEl = template.content.querySelector(".result-item-img");
    imgEl.src = r.thumbnail;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  const formEl = document.querySelector(".search-form");

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const contenedor = document.querySelector(".results");
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.lastChild);
    }

    const palabraABuscar = e.target.buscar.value;

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar)
      .then((response) => response.json())
      .then((data) => mostrarResultados(data.results));
  });
}

main();
