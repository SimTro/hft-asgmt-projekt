// imports

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// connection to database

const db = new sqlite3.Database('./db/data.db', (err) => {
  if (err) {
    console.err("Couldn't load database!");
  }
  console.log("Database loaded.");
});

// define port

const port = process.env.PORT || 3000;
const app = express();

// define, which middleware our app should use

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));


// Below are all the routes

app.get('/', async (req, res) => {
  res.render('pages/index');
});


app.get('/carbrands', (req, res) => {
  db.all("SELECT DISTINCT carbrand FROM scene_links", (err, rows) => {
    if (err) {
      console.log("Couldn't select carbrands from database!");
    }
    console.log("Got carbrands from database.");
    res.json(rows);
  });
});


app.post('/models', async (req, res) => {
  console.log("Server received car brand (" + req.body.carbrand + ")");
  db.all("SELECT model FROM scene_links WHERE carbrand LIKE ?", [req.body.carbrand], (err, rows) => {
    if(err){
      console.log("Couldn't select models from database!");
    }
    console.log("Got models from database.");
    rows.forEach( row => console.log(row.model));
    res.json(rows);
  });
});


// Providing path for choosen carbrand and model

app.post('/carScene', async (req, res) => {
  //get Scene Link from Database and give it back with response
  db.get("SELECT scene_link path FROM scene_links WHERE carbrand = ? AND model = ?;", [req.body.carbrand, req.body.model], (err, row) => {
    if (err) {
      throw err;
    }
    console.log("carScene path: " + row.path);
    res.json({ "path": row.path });
  });
});

// GET-Routes for carScenes

app.get('/car_scenes/car_scene_TEST_01', async (req, res) => {
  res.render("car_scenes/car_scene_TEST_01");
});


// Let app listen to choosen port
// -> so we can send requests to it, using this port

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}…`)
});

module.exports = server
