require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// SESSION SETUP
var sess = {
  secret: "the bracket battle",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
};

// SESSION SETUP
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
};

app.use(session(sess));


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  // for testing
  db.User.create({
    username: "jpaul",
    password: "1234"
  }).then(function (db) {
    // console.log(db);
  });

  // for testing
  db.Bracket.create({
    bracket_name: "test",
    teamNames: [
      ["Team 1", "Team 2"],
      ["Team 3", null],
      ["Team 4", null],
      ["Team 5", null]
    ],
    results: [
      [[1, 0], [null, null], [null, null], [null, null]],
      [[null, null], [1, 4]],
      [[null, null], [null, null]]
    ],
    UserId: 1
  }).then(function (db) {
    // console.log(db);
  });

  db.Bracket.create({
    bracket_name: "test1",
    teamNames: [
      ["Team 1", "Team 2"],
      ["Team 3", null],
      ["Team 4", null],
      ["Team 5", null]
    ],
    results: [
      [[1, 0], [null, null], [null, null], [null, null]],
      [[null, null], [1, 4]],
      [[null, null], [null, null]]
    ],
    UserId: 1
  }).then(function (db) {
    // console.log(db);
  });

  db.Bracket.create({
    bracket_name: "test2",
    teamNames: [
      ["Team 1", "Team 2"],
      ["Team 3", null],
      ["Team 4", null],
      ["Team 5", null]
    ],
    results: [
      [[1, 0], [null, null], [null, null], [null, null]],
      [[null, null], [1, 4]],
      [[null, null], [null, null]]
    ],
    UserId: 1
  }).then(function (db) {
    // console.log(db);
  });

  db.Bracket.create({
    bracket_name: "test2",
    teamNames: [
      ["Team 1", "Team 2"],
      ["Team 3", null],
      ["Team 4", null],
      ["Team 5", null]
    ],
    results: [
      [[1, 0], [null, null], [null, null], [null, null]],
      [[null, null], [1, 4]],
      [[null, null], [null, null]]
    ],
    UserId: 1
  }).then(function (db) {
    // console.log(db);
  });
});

module.exports = app;
