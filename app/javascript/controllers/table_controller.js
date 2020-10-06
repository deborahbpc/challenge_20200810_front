import { Controller } from "stimulus";

export default class extends Controller {

  static targets = [ 'file' ];

  connect() {
    console.log('Hello!');
    setInterval(this.updateTable, 5000);
  };

  upload () {
    console.log("You clicked the button");
    // upload file
    // post to api
    
  };

  updateTable = () => {
    console.log("Updating table...")
    
  };
}
