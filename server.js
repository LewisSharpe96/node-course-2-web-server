const express = require("express"),
      app = express(),
      hbs = require("hbs"),
      fs = require("fs");

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log("Unable to append to server.log.");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Home",
    welcomeMessage: "Hello and welcome to my site"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: 'About Page'
  });
});

app.get("/projects", (req, res) => {
  res.render("projects", {
    pageTitle: 'Projects'
  });
});

app.listen(port, () => {
  console.log("Server started");
});
