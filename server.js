require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
mongoose.connect(process.env.MONGODB_URI);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.sendFile(__dirname+"/views/index.html");
// })
// app.get('/about', (req, res) => {
//   res.send('about peitz');
// })
// app.get('/contact', (req, res) => {
//   res.send('contact oeitz');
// })
// app.get('/products', (req, res) => {
//   res.send('products peitz');
// })
const SuperLeague = mongoose.model('SuperLeague', {
  name: {type: String},
  logo: {type: String},
  points: {type: Number}
});

app.get("/superleague",(req,res)=>{
  SuperLeague
  .find({})
  .then(teams=>{
    res.json(teams);
  })
})
app.get("/superleague/:teamId",(req,res)=>{
  // res.json({team: req.params.teamId});
  SuperLeague
  .findById(req.params.teamId)
  .then(team=>{
    res.json(team);
  })
})
app.get('/data', (req, res) => {
  res.json({
    name: "zartas zartanian"
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


app.post('/create',(req, res)=>{
  // console.log(req.body);
  const team = new SuperLeague(req.body);
  team.save();
  res.json({success:true});
});

