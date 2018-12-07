// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  global.$ = require('jquery')

}
// END

$(document).ready((() => {

  console.log('DOM is ready!')

  getData(); // TODO: Implement getData Method

  const carbrands = $('#select_carbrand');
  const models = $('#select_model')

  $('#form_search').on('keyup', async (event) => {
    // TODO send selectet carbrand to server and wait for response
    // when server sends use a list of models add them to dropdowne menü "model"
    console.log("KEYUP EVENT");
    try {
      const response = await fetch('/models', {
        method: "GET",
        body: carbrands.options[carbrands.selectedIndex].text
      });
    } catch (err) {
      console.log(err.name + ":" + err.message);
    }
    console.log("WOOORKING");

  });

  $('#form_search').on('submit', async (event) => {
    event.preventDefault();
    await getCarScene(carbrands.options[carbrands.selectedIndex].text, models.options[models.selectedIndex].text);
  })
}))

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
    const json = await response.json();

    var carbrands = document.getElementById("select_carbrand");
    json.forEach(row => {
      var option = document.createElement('option');
      option.text = row.Automarke;
      console.log(row.Automarke);
      carbrands.add(option);
    });

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
  const url = await response.text();

  if (!response.ok) {
    console.error('Fehler weil respone not ok');
  } else {
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
