const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./db/data.db', (err) => {
  if (err) {
    console.err("Couldn't load database!");
  }
  console.log("Database loaded.");
});

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', async (req, res) => {
  res.render('pages/index')
});

app.get('/carbrands', (req, res) => {

  db.all("SELECT DISTINCT MIN(ID) AS ID, Automarke FROM SzenenLinks GROUP BY Automarke", (err, rows) => {
    if (err) {
      console.log("Couldn't select carbrands from database!");
    }
    console.log("Got carbrands from database.");
    res.json(rows);
  });
});

app.post('/models', async (req, res) => {
  console.log("bin drin");
  db.all("SELECT Model FROM SzenenLinks WHERE Automarke = ?", [req.body.carbrand], (err, rows) => {
    if(err){
      console.log("Couldn't select models from database!");
    }
    console.log("Got models from database.");
    rows.forEach( row => console.log(row.Model));
    res.json(rows);
  });
});

app.post('/carScene', async (req, res) => {
  //get Scene Link from Database and give it back with response
  db.get("SELECT SzenenLink link FROM SzenenLinks WHERE Automarke = ? AND Model = ?;", [req.body.carbrand, req.body.model], (err, row) => {
    if (err) {
      throw err;
    }
    res.text(row.link);
  });
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}…`)
});

module.exports = server
