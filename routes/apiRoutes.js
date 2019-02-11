var db = require("../models");

module.exports = function(app) {
  // Get all examples

  // Artists API calls
  app.get("/", function(req, res) {
    db.Artist.findAll({}).then(function(results) {
      var hbsObject = {
        band: results
      };
      // console.log(results)
      res.render("index", hbsObject)
    });
  });

  // app.get("/artistsearch:id", function(req, res) {
  //   db.Shows.findAll({
  //     where: {
  //       ArtistId: req.params.id
  //     } 
  //   }).then(function(results) {
  //     var showsObject = {
  //       show: results
  //     }
  //     console.log(results)
  //     res.render("events", showsObject)
  //   })
  // });

  app.post("/api/newArtist", function(req, res) {
    db.Artist.create({
      Artist: req.body.artist,
      Genre: req.body.genre,
      Website: req.body.website,
      Logo: req.body.logo
    }).then(function(results) {
      res.json(results)
    });
  });


  app.post("/api/updateArtist", function(req, res) {
    db.Show.update(
      {
        Logo: "myPic.jpeg"
      },
      {
        where: {
          id: 2
        }
      }
    ).then(function(results) {
      res.json(results);
    })
  });

  app.post("/api/deleteArtist", function(req, res) {
    db.Artist.destroy({
      where: {
        id: 3
      }
    }).then(function(results) {
      res.redirect("/api/events")
    });
  });


// Events API calls
app.get("/events", function(req, res) {
  db.Show.findAll({}).then(function(results) {
    var hbsObject = {
      event: results
    };
    res.render("events", hbsObject)
  });
});

// app.get("/createEvent", function(req, res) {
//   db.Artist.findAll({}).then(function(results) {
//     var hbsObject = {
//       musician: results
//     };
//     res.render("createEvent", hbsObject)
//   });

  app.get("/eventsQuery", function(req, res) {
    db.Show.findAll({
      where: {
        bandName: req.query.artistName,
      }
    }).then(function(results) {
      var hbsObject = {
          event: results
        };
      console.log("This is my band name: " + req.body.artistName);
      res.render("events", hbsObject)
      // res.json(results);
    });
  });

// app.get("/eventsQuery", function(req, res) {
//   db.Show.findAll({
//     where: {
//       bandName: req.body.bandName 
//     },
//   }).then(function(results) {
//     var hbsObject = {
//       event: results
//     };
//     console.log(results)
//     res.render("events", hbsObject)
//   });
// });


app.post("/api/newEvent", function(req, res) {
  db.Show.create({
    bandName: req.body.artistName,
    Venue: req.body.venue,
    Date: req.body.date,
    Price: req.body.price,
    Facebook: req.body.facebook,
    // ArtistId: "artistsId"
  }).then(function(results) {
    console.log(results)
    res.json(results)
  });
});

app.post("/api/updateEvent", function(req, res) {
  db.Show.update(
    {
      Venue: "stubbs"
    },
    {
      where: {
        id: 2
      }
    }
  ).then(function(results) {
    res.json(results);
  })
});

app.post("/api/deleteEvent", function(req, res) {
  db.Show.destroy({
    where: {
      id: 2
    }
  }).then(function(results) {
    res.redirect("/api/events")
  });
});


}