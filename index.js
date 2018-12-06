const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./db/data2.db', (err) =>{
  if(err) {
    console.log("Data geht nett");
  }
  console.log("alles gut");
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


app.get('/carbrands', async (req, res) => {

  db.all("SELECT DISTINCT * FROM SzenenLinks",[], async (err, rows) => {
    if (err) {
      console.log("errror indx.js 30")
    }
    console.log("Selectet Carbrands");
    rows.forEach(row => {
      console.log(row.SzenenLink);
    })

    res.json(rows);
  });
});

app.post('/carScene', async (req, res) => {
    //get Scene Link from Database and give it back with response
  db.get("SELECT SzenenLink link FROM SzenenLinks WHERE Automarke = ? AND Model = ?;", [req.body.carbrand, req.body.model], (err, row) =>{
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
