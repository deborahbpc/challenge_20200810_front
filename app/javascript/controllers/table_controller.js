import { Controller } from "stimulus";

export default class extends Controller {

  static targets = [ 'File' ];

  connect() {
    console.log('Hello!');
    setTimeout(this.updateTable, 5000);
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
    setTimeout(this.updateTable, 5000);
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
              console.log(products);
              if (products.length > 0) {
                  table.innerHTML = "";
                  products.forEach((product) => {
                      table.innerHTML += `
                            <td>${product.title}</td>
                            <td>${product.type}</td>
                            <td>${product.rating}</td>
                            <td>$${product.price.toFixed(2)}</td>
                            <td>${new Date(product.created_at).toLocaleString('pt-BR', { dateStyle: 'short' })}</td>
                            <td>
                              <!-- Button trigger modal -->
                              <span>
                                <button type="button" class="btn btn-link" data-toggle="modal" data-target="#editModalLong">
                                  <!--<i class="far fa-edit"></i>-->Edit 
                                </button>
                              </span>
                              
                              <!-- Modal -->
                              <div class="modal fade" id="editModalLong" tabindex="-1" role="dialog" aria-labelledby="editModalLongTitle" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="editModalLongTitle">Edit ${product.title}</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div class="modal-body">
                                      <form>
                                        <div class="form-group string required form-group-valid">
                                          <label for="title">Title</label>
                                          <input type="title" class="form-control" id="title" value="${product.title}">
                                        </div>
                                        <div class="form-group string required form-group-valid">
                                          <label class="string required" for="type">Type</label>
                                          <input type="type" class="form-control" id="type" value="${product.type}">
                                        </div>
                                        <div class="form-group">
                                          <label for="description">Description</label>
                                          <input type="description" class="form-control" id="description" value="${product.description}">
                                        </div>
                                        <div class="form-group">
                                          <label for="staticFilename">Filename</label>
                                          <input class="form-control" type="text" value="${product.filename}" readonly id="staticFilename">
                                        </div>
                                        <div class="form-group">
                                          <label for="staticHeight">Height</label>
                                          <input class="form-control" type="text" value="${product.height}" readonly id ="staticHeight">
                                        </div>
                                        <div class="form-group">
                                          <label for="staticWidth">Width</label>
                                          <input class="form-control" type="text" value="${product.width}" readonly id="staticWidth">
                                        </div>
                                        <div class="form-group">
                                          <label for="price">Price</label>
                                          <input class="form-control" type="number" step="0.01" value="${product.price}" min="0.01""  id="staticWidth">
                                        </div>
                                        <div class="form-group integer required form-group-valid">
                                          <label class="integer" for="rating">Rating</label>
                                          <input class="form-control is-valid numeric integer required" type="number" id="staticWidth" step="1" value="${product.rating}" min="1" max="5">
                                        </div>
                                        <div class="d-flex justify-content-center">
                                          <button type="submit" data-confirm="Are you sure?" class="btn btn-outline-secondary" id="edit-btn" data-action="">Save changes</button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <span><button data-confirm="Are you sure?" type="button" class="btn btn-link" data-url="https://challenge-20200810-v1.herokuapp.com/api/v1/products/${product.id}"><!--<i class="far fa-trash-alt"></i>-->Delete </button></span>
                            </td>
                      `;
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

  updateProduct = () => {
    fetch(
      "https://challenge-20200810-v1.herokuapp.com/api/v1/products", {
          method: "PUT",
          headers: {
              "content-type": "application/json",
              "X-User-Email": "teste@teste.com",
              "X-User-Token": APIKEY,
          },
          body: JSON.stringify(product),
      }
    );
  };

  deleteProduct = () => {

    fetch(
      "https://challenge-20200810-v1.herokuapp.com/api/v1/products", {
          method: "DELETE",
          headers: {
              "content-type": "application/json",
              "X-User-Email": "teste@teste.com",
              "X-User-Token": APIKEY,
          },
          body: JSON.stringify(product),
      }
    );
  };
}
