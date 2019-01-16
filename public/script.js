// Pre-initialize variables, so that we can use them in all functions

let carbrands = null;
let models = null;
let categorys = null;
let link = null;
let usernames = null;
let passworts = null;
var admin_link= null;


//// as soon as DOM (Document Object Model) is loaded, do this:

$(document).ready(() => {

  console.log('DOM is ready!')

  carbrands = $('#select_carbrand'); // carbrand dropdown
  models = $('#select_model'); // model dropdown
  categorys = $('#select_category');
  link = $("#link_suggestion");
 
  // on resizing, scale iframe

  window.onresize = function(event) {
    $('#iframe_scene').height($(window).height()/2);
  };

  // get carbrands and add them to dropdown menu
  
  getData(); 

  // listen for change in carbrand dropdown and show models for selected carbrand

  $('#select_carbrand').on('change', async (event) => {
    event.preventDefault();
    showModels( carbrands.find(":selected").text() );
  });

  // listen for change in Model dropdown and show category for selected carbrand/model

  $('#select_model').on('change', async (event) => {
    event.preventDefault();
    showCategorys();
  });

  // listen for submit event on form (when button is pressed)

  $('#form_search').on('submit', async (event) => {
    event.preventDefault();
    // clear previous carscenes
    $('#iframe_scene').addClass('d-none');
    $('#table_mobile_version').html("");
    // if mobile device, don't load 3D-scene
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
      await showMobileVersion(carbrands.find(":selected").text(), models.find(":selected").text());
    }else{
      await getCarScene(carbrands.find(":selected").text(), models.find(":selected").text());
    }
  });

  // disable suggest button

  $("#form_suggest").on("keyup", (event) => {
    if (formElementIsValid(link.val(), 5)) {
      toggleSuggest(false)
    } else {
      toggleSuggest(true)
    }
  })

 
  //Suggest Link Form

  $("#form_suggest").on("submit", async (event) => {
    event.preventDefault();
    await suggestLink(carbrands.find(":selected").text(), models.find(":selected").text(), categorys.find(":selected").text(), link.val() );
  })

   // Admin loggin
 $('#form_login').on('submit', async (event) => {
  event.preventDefault();
  var usernames = document.querySelector("#loginname").value; 
  var passworts = document.querySelector("#password").value;
  await getLogin(usernames,passworts);
})

$('#admin_form_search').on('submit', async (event) => {
  event.preventDefault();
  gettabl_data(1);
})
});

//// functions are definded below this line

function toggleSuggest(disable) {
  const suggestButton = $("#button_suggest")
  suggestButton.prop("disabled", disable)
}

function formElementIsValid(element, minLength) {
  return element.length >= minLength
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
    showCategorys();
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

async function showCategorys() {
  console.log(" get models...")
  
  try {
    const response = await fetch('/categorys', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    });
    const categoryJSON = await response.json();
    
    console.log("I (hopefully) got the following categorys: ");
    
    categorys.empty(); // remove previous categorys from dropdown 

    categoryJSON.forEach(row => {
      console.log(row.category);
      
      var option = document.createElement('option');
      option.text = row.category;
      categorys.append(option);
    })
  } catch (err) {
    console.log(err.name + ": " + err.message);
  }
}

//suggest function

async function suggestLink(carbrand, model, category, link) {
  var data = {"carbrand" : carbrand, "model" : model, "category" : category, "link" : link};

  const response = await fetch("/suggest", {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  alert("Vorschlag wurde eingereicht");
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

  // load scene in iframe 
  // if first time loading show some info about controls
  $('#info_controls').html("");
  if($('#iframe_scene').attr('src') == ""){
    $('#iframe_scene').attr('src', carSceneJSON.path);
    $('#iframe_scene').height($(window).height()/2);
    $("#myHeading").hide(); 
    $('#info_controls').removeClass('d-none');
    $('#info_controls').append("<br><br><div class=\"row justify-content-center\">&#8592; &#8594; Ansicht mit Pfeiltasten rotieren</div>");
    setTimeout(function(){ $('#info_controls').append("<br><br><div class=\"row justify-content-center\">&#9757; &#9757; Doppelklick auf gewünschten Bereich</div>");
      setTimeout(function(){ $('#info_controls').append("<br><br><div class=\"row justify-content-center\">&#9757; Klick auf Schrift zeigt Auswahl</div><br><br>"); 
        setTimeout(function(){ $('#info_controls').addClass('d-none'); $('#info_controls').empty(); $('#iframe_scene').removeClass('d-none'); $('#iframe_scene').focus(); }, 4000);}, 1200);}, 1200);
  } else {
    $('#iframe_scene').attr('src', carSceneJSON.path);
    $('#iframe_scene').removeClass('d-none');
    $('#iframe_scene').focus();
  }
}

async function showMobileVersion(carbrand, model){
  var data = { "carbrand": carbrand, "model": model };

  const response = await fetch("/carScene_mobile_data", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const carDataJSON = await response.json();

  $("#myHeading").hide(); 
  $('#table_mobile_version').append("<br>");
  carDataJSON.categories.forEach(category => {
    $('#table_mobile_version').append(`<h3>${category.category}</h3>`);
    carDataJSON.rows.filter( row => row.category == category.category).forEach(entry => {
      $('#table_mobile_version').append(`<a href=\"${entry.link}\">${entry.link}</a><br><br>`);
    });
    $('#table_mobile_version').append(`<br>`);
  });
  
}

//////////// ********************************************** ADMIN ***********************************




// passwort sending and anser
async function getLogin(username, passwort) {

  var data = { "username": username, "passwort": passwort};

  const response = await fetch("/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const rowJSON = await response.json();
  const rowJSONlink = rowJSON.row.link;
  if(rowJSONlink == undefined) return;
  admin_link = rowJSONlink;
  console.log("151 " + admin_link);
  window.location = rowJSONlink; 
  console.log("153 " + admin_link);
}


// Delete Butten
async function delete_row(clicked_id , para)
{
  var data = { "rowid": clicked_id};
  const response = await fetch("/deleteRow", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(data),
  });
  await response.json();

  gettabl_data(para);
}

// Veröffentlichen Button
async function save_row(clicked_id){
  var data = { "rowid": clicked_id};
  const response = await fetch("/saveRow", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(data),
  });
  gettabl_data(0);
}
// ******   Katergorriene 
async function gettabl_data(para){

  carbrands = $('#select_carbrand'); // carbrand dropdown
  models = $('#select_model'); // model dropdown
  carbrand = carbrands.find(":selected").text();
  model = models.find(":selected").text();

    var data = { "para": para , "carbrand": carbrand, "model": model};
  
  
  
  try {
    const response = await fetch('/adminTable', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const rowsJSON = await response.json();
    
    $("#shouts").html(''); // remove previous rows from table
    
    let rowString = 
    `<tr>
    <th>Link</th>
    <th>Kategorie</th>
    <th>Automarke</th>
    <th>Model</th>
    <th>Löschen</th>
    </tr>`;
    

    let rowpublicString = `<tr>
    <th>Link</th>
    <th>Kategorie</th>
    <th>Automarke</th>
    <th>Model</th>
    <th>Veröffentlichen</th>
    <th>Löschen</th>
    </tr>`;
    if (para == 1){
    $("#shouts").append(rowString);
    $("#admin_form_search").css("display","block")
    }
    else if ( para == 0){
    $("#admin_form_search").css("display","none")
    $("#shouts").append(rowpublicString);
    }
  
    rowsJSON.forEach(row => {
      rowString = `<tr><td><a href=${row.link} style=\"display:block;margin:0px;width:100%;height:100%;\">                   ${row.link }<\/a><\/td> 
                  <td>${row.category} <\/td>
                  <td>${row.carbrand} <\/td>
                  <td>${row.model} <\/td>
                  <td><button id=\"${row.rowid}\" onClick=\"delete_row(this.id , 1 )\" class=\"btn btn-primary\">L\u00F6schen<\/button><\/td>
                  <\/tr>`;

                  rowpublicString = `<tr><td><a href=${row.link} style=\"display:block;margin:0px;width:100%;height:100%;\">                   ${row.link }<\/a><\/td> 
                  <td>${row.category} <\/td>
                  <td>${row.carbrand} <\/td>
                  <td>${row.model} <\/td>
                  <td><button id=\"${row.rowid}\" onClick=\"save_row(this.id)\" class=\"btn btn-primary\">Ver\u00F6ffentlichen<\/button><\/td>
                  <td><button id=\"${row.rowid}\" onClick=\"delete_row(this.id , 0)\" class=\"btn btn-primary\">L\u00F6schen<\/button><\/td>
                  <\/tr>`;

                  if (para == 1){
                    
                    $("#shouts").append(rowString);
                    }
                    else if ( para == 0){
                     
                    $("#shouts").append(rowpublicString);
                    }
    });
    
  } catch (err) {
    console.log(err.name + ": " + err.message);
  }
}