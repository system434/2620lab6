/*
 Authors:
 Your name and student #: James Murphy - A01236645
 Your Partner's Name and student #: 
*/
const express = require("express");
const ejs = require("ejs");


const fs = require('fs')

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

  let movieName = req.params.movieName;
  movieName = movieName.toLowerCase();
  
    
  fs.readFile('movieDescriptions.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    
    let movie = data.split("\n");
    // console.log(movie);
    // console.log(movie.length);
    let fulldesc = {
      title:"",
      desc:""
    };
    for(let i =0 ; i<movie.length ; i++){
      let fullMovie = movie[i].split(":");
      let movieTitle = fullMovie[0].toLowerCase();
      let moviedesc = fullMovie[1].toLowerCase();
      // console.log(fullMovie);
      // console.log(movieTitle);
      // console.log(moviedesc);

      // console.log(movieName);
      if (movieName == movieTitle){
        fulldesc.title = movieTitle;
        fulldesc.desc = moviedesc;
        res.render("pages/searchResult", {movieTitle:fulldesc.title,moviedesc:fulldesc.desc});
        break;
      }
    }
    res.render("pages/searchResult",{movieTitle:"Error",moviedesc:"Movie could not be found"})

    
    
                  
    
  })
  




  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});




