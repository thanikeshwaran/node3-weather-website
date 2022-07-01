const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
// console.log(__filename)
console.log(path.join(__dirname, "../public"));

const app = express(); // express is a function (not an object)

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");
console.log("views path: " + viewsPath);

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); // To tell express where to look at for views folder
hbs.registerPartials(partialsPath); // registerPartials takes a path to the directory where
// your partials live

// Setup static directory to serve
// It's a way to customize a server
app.use(express.static(publicDirectoryPath)); // express.static() is a function. static takes the path to
// the folder we want to serve up and we have that in that path module

// This lets us configure what the server should do when someone tries to get the resource
// at a specific URL, may be we should be sending back HTML or we should be sending back
// JSON. It takes in two arguments. First is the route - partial URL - example: /help ,
// /about. Second argument is the function . This is where we describe what we want to do
// when someone visits this particular route(first argument route).
// This function (second argument) gets called with two very important argument.
// The first is an object containing information about the incoming request to the server.
// this is commonly called "req". The other argument is response - "res"
// app.get("", (req, res) => {
//   // this is what is going to display in the browser window. we could use couple
//   // methods on "res" (response) to send response back to requester
//   res.send("<h1>Weather</h1>"); // this is never going to run since we have index.html
//   // file in the public folder which serves as the source of root URL
// });

// app.get("/help", (req, res) => {
//   //   res.send("Help page");
//   //   res.send({
//   //     name: "Thanikesh",
//   //     age: 24,
//   //   });

//   res.send([{ name: "Thanikesh" }, { name: "Jack" }, { name: "John" }]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Thanikesh",
  }); // No need of file extension. Just correct name of the template
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Thanikesh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Click here for help",
    title: "Help",
    name: "Thanikesh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(latitude, longitude, (error, result) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send({
        forecast: result,
        location,
        address: req.query.address
      });
    });
  });

  // console.log(req.query.address);
  // res.send({
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  // res.send('Help page not found');
  res.render("notfound", {
    message: "Help page not found",
    title: "Help",
    name: "Thanikesh",
  });
});

app.get("*", (req, res) => {
  // why does this app.get need to come last after
  // all other routes are set up?
  //  res.send('My 404 page');
  res.render("notfound", {
    message: "Requested page not found",
    name: "Thanikesh",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
}); // to start the server up - common development port - 3000
//  3000 is not a default port. once server starts, second argument - optional
// - callback function will get called

// app.com
// app.com/help
// app.com/about
