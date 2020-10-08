import { Controller } from "stimulus";

export default class extends Controller {

  static targets = [ 'File' ];

  connect() {
    console.log('Hello!');
    setInterval(this.updateTable, 10000);
  };

  upload () {
    console.log("You clicked the button");
    console.log(this.FileTarget.files[0]);
    let formData = new FormData();
    formData.append('file', this.FileTarget.files[0]);
    console.log(formData[0]);
    // upload file
    // post to api
    
  };

  updateTable = () => {
    console.log("Updating table...")
  };
}
