import { Controller } from "stimulus";

export default class extends Controller {

  static targets = [ 'File' ];

  initialize() {
    console.log('Hello!');
    // setTimeout(this.updateTable, 100000);
  };

  upload () {
    console.log("You clicked the button");
    let fileContent = this.FileTarget.files[0];
    let reader = new FileReader();
    const APIKEY = process.env.API_KEY
    reader.readAsText(fileContent);
    reader.onload = function() {
      let newProducts = JSON.parse(reader.result);
      console.log(newProducts);
      newProducts.forEach((product) => {
          fetch(
              "https://challenge-20200810-v1.herokuapp.com/api/v1/products", {
                  method: "POST",
                  headers: {
                      "content-type": "application/json",
                      "X-User-Email": "teste@teste.com",
                      "X-User-Token": APIKEY,
                  },
                  body: JSON.stringify(product),
              }
          );
      });
    };
    // this.updateTable();
    setTimeout(this.updateTable, 100000);
  };

  updateTable = () => {
    console.log("Updating table...")
    let products;
    let table = document.getElementById("products-list");
    const APIKEY = process.env.API_KEY
    fetch(
      "https://challenge-20200810-v1.herokuapp.com/api/v1/products", {
          headers: {
              "X-User-Email": "teste@teste.com",
              "X-User-Token": APIKEY,
          },
      }
    )
      .then((response) => response.json())
      .then((data) => (products = data))
      .then(
          () => {
              console.log("Products" + products);
              if (products.length > 0) {
                  table.innerHTML = "";
                  products.forEach((product) => {
                      table.innerHTML += `<td>${product.title}</td><td>${product.type}</td><td>${product.rating}</td><td>$${product.price}</td><td>${product.created_at.strftime("%d/%m/%Y")}</td><td>Actions</td>`;
                  });
              }
          },
          () => {
              if (products.length === 0) {
                console.log("No products to show.");
              }
          }
      );
  };
}
