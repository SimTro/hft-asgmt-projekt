// Pre-initialize variables, so that we can use them in all functions

let carbrands = null;
let models = null;


//// as soon as DOM (Document Object Model) is loaded, do this:


$(document).ready((() => {

  console.log('DOM is ready!')

  carbrands = $('#select_carbrand'); // carbrand dropdown
  models = $('#select_model'); // model dropdown

  // get carbrands and add them to dropdown menu

  getData(); 

  // listen for change in carbrand dropdown and show models for selected carbrand

  $('#select_carbrand').on('change', async (event) => {
    event.preventDefault();
    showModels( carbrands.find(":selected").text() );
  });

  // listen for submit event on form (when button is pressed)

  $('#form_search').on('submit', async (event) => {
    event.preventDefault();
    await getCarScene(carbrands.find(":selected").text(), models.find(":selected").text());
  })
}))


//// functions are definded below this line


async function getData() {
  try {
    const response = await fetch("/carbrands", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" }
    });
    console.log("I (hopefully) got the following Carbrands: ");
    const carbrandsJSON = await response.json();

    carbrandsJSON.forEach(row => {
      var option = document.createElement('option');
      option.text = row.carbrand;
      console.log(row.carbrand);
      carbrands.append(option);
    });
    showModels( carbrands.find(":selected").text() );
  } catch (err) {
    console.log(err.name + ":" + err.message);
  }
}


async function showModels(carbrand) {
  // send selectet carbrand to server and wait for response
  // as soon as server sends us a list of models, add them to dropdown menu "model"
  console.log("Sending carbrand (" + carbrand + ") to server to get models...")
  
  var data = { "carbrand": carbrand };
  
  try {
    const response = await fetch('/models', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const modelsJSON = await response.json();
    
    console.log("I (hopefully) got the following Models: ");
    
    models.empty(); // remove previous models from dropdown 

    modelsJSON.forEach(row => {
      console.log(row.model);
      
      var option = document.createElement('option');
      option.text = row.model;
      models.append(option);
    })
  } catch (err) {
    console.log(err.name + ": " + err.message);
  }
}


async function getCarScene(carbrand, model) {

  var data = { "carbrand": carbrand, "model": model };

  const response = await fetch("/carScene", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const carSceneJSON = await response.json();

  $('#iframe_scene').attr('src', carSceneJSON.path);
}
