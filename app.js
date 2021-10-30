/*
 Authors:
 Your name and student #: James Murphy - A01236645
 Your Partner's Name and student #: 
*/
const express = require("express");

let movieDicts = []
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index",  { movieList: movieDicts }));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  movieStr = req.body.movieStr
  movieList = movieStr.split(',')
  for(movie of movieList){
    movieDicts.push({name: `${movie}`})
  }
  res.redirect('/')
});

app.get("/myListQueryString", (req, res) => {
  fakeMovieDicts = []

  items = req.query
  console.log
  for(i in items){
    fakeMovieDicts.push({name: `${items[i]}`})
  }
  res.render("pages/index",  { movieList: fakeMovieDicts })
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});