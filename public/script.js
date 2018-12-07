let carbrands = null;
let models = null;

/////////// when Document (Website) is loaded, do this:
$(document).ready((() => {

  console.log('DOM is ready!')

  getData(); // TODO: Implement getData Method

  carbrands = $('#select_carbrand');
  models = $('#select_model');


  $('#select_carbrand').on('change', async (event) => {
    event.preventDefault();
    console.log("CHANGE EVENT OCCURED!");
    showModels( carbrands.find(":selected").text() );
  });

  $('#form_search').on('submit', async (event) => {
    event.preventDefault();
    await getCarScene(carbrands.find(":selected").text(), models.find(":selected").text());
  })
}))

/////////// functions are definded below this line
function toggleSubmit(disable) {
  const submitButton = $('#button_search');
  submitButton.prop('disabled', disable);
}

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


async function getCarScene(carbrand, model) {

  var data = { "carbrand": carbrand, "model": model };

  const response = await fetch("/carScene", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const path = await response.json();

  loadIframe(path.text);
}

function loadIframe(path) {
  console.log(path);
  window.location = path;

  // Or we use an iframe
  //$('#iframe_scene').attr('src',path);

  // Just inspiration on how to load the 3d-Scene
  /*   Depends on your specific situation, but if the iframe can be deployed after the rest of the page's loading, you can simply use a query string, a la:

  <iframe src="some_page.html?somedata=5&more=bacon"></iframe>
  And then somewhere in some_page.html:

  <script>
  var params = location.href.split('?')[1].split('&');
  data = {};
  for (x in params)
  {
  data[params[x].split('=')[0]] = params[x].split('=')[1];
  }
  </script> */

}

async function showModels(carbrand) {
  // TODO send selectet carbrand to server and wait for response
  // when server sends use a list of models add them to dropdown menu "model"
  console.log("Sending carbrand (" + carbrand + ") to server to get models...")
  var data = { "carbrand": carbrand };
  try {
    const response = await fetch('/models', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    console.log("I (hopefully) got the following Models: ");
    const modelsJSON = await response.json();

    models.empty();
    modelsJSON.forEach(row => {
      var option = document.createElement('option');
      option.text = row.model;
      console.log(row.model);
      models.append(option);
    })
  } catch (err) {
    console.log(err.name + ": What went wrong? - " + err.message);
  }

}
