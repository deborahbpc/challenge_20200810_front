import { Controller } from "stimulus";

export default class extends Controller {

  static targets = [ 'File' ];

  initialize() {
    console.log('Hello!');
    setTimeout(this.updateTable, 10000);
  };

  upload () {
    console.log("You clicked the button");
    let fileContent = this.FileTarget.files[0];
    let reader = new FileReader();
    reader.readAsText(fileContent);
    reader.onload = function() {
      let newProducts = JSON.parse(reader.result);
      console.log(newProducts);
      newProducts.forEach((product) => {
          fetch(
              "http://localhost:3000/api/v1/products", {
                  method: "POST",
                  headers: {
                      "content-type": "application/json",
                      "X-User-Email": "teste@teste.com",
                      "X-User-Token": "Pemsc55MZsruxR5Hkzm2",
                  },
                  body: { products_arr: JSON.stringify(product) },
              }
          );
      });
    };
    this.updateTable();
  };

  updateTable = () => {
    console.log("Updating table...")
    let products;
    let table = document.getElementById("products-list");
  };
}
