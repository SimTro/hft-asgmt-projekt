// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  global.$ = require('jquery')

}
// END

$( document ).ready((() => {

  console.log('DOM is ready!')
  
  getData(); // TODO: Implement getData Method

  const carbrands = $('#select_carbrand');
  const models = $('#select_model')
  $('#hft-shoutbox-form').on('keyup', (event) => {
  // TODO send selectet carbrand to server and wait for response
  // when server sends use a list of models add them to dropdowne menü "model"
  })

  $('#form_search').on('submit', async (event) => {
    event.preventDefault();
    await getCarScene(carbrand.options[carbrand.selectedIndex].text, model.options[model.selectedIndex].text);
  })
}))

function formElementIsValid(element, minLength) {
  return element.length >= minLength
}

function toggleAlertBox(show) {
  const alertEl = $('#hft-shoutbox-alert')

  if (show) {
    alertEl.removeClass('d-none')
  } else {
    alertEl.addClass('d-none')
  }
}

function toggleSubmit(disable) {
  const submitButton = $('#hft-shoutbox-form-submit')
  submitButton.prop('disabled', disable)
}

async function getData() {
  
  try{
   
    const response = await fetch("/carbrands", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {"Content-Type": "application/json"}
     });
    const json = await response.json();

    var carbrands = document.getElementById("select_carbrand");
    json.forEach( row => {
      var option = document.createElement('option');
      option.text = row.Automarke;
      carbrands.add(option);
    });

    var model = document.getElementById("select_model");
    json.forEach( row => {
      var option = document.createElement('option');
      option.text = row.Model;
      model.add(option);
    });

  } catch (err){  
    console.log(err.name + ":" + err.message);
  }
}


async function getCarScene(carbrand, model) {

  var data = {"carbrand":carbrand, "model":model};

    const response = await fetch("/carScene", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
  });
    const url = await response.text();
   
    if(!response.ok){
      console.error('Fehler weil respone not ok');
    }else {
 window.open(url, "_blank");
  }
}

// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  module.exports = {
    getData,
    saveData
  }
}
