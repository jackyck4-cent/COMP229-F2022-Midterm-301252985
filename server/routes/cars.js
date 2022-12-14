// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   res.render("cars/add", {
    title: "Cars - create",
  });
});

// POST process the Car  Details page and create a new Car  - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let carobject = car({
      Carname : req.body.Carname,
      Category : req.body.Category,
      Carmodel : req.body.Carmodel,
      Price : req.body.Price
  })

  car.create(carobject , (err , car) => {

    if (err)
    {
      return console.error(err);
    }
    else
    {
        res.redirect("/cars");
    }
});
});

// GET - process the delete
router.get("/delete", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let carname = req.query.carname;
   let range1 = req.query.range1;
   let range2 = req.query.range2;

   console.log("Cname"+carname+" "+range1+" "+range2);
   let conditions = {};

   if (range1 != "" && range2 != "" )
   {
      conditions.Price = {$gte : range1 , $lte : range2};
   }
   else if (range1 != "" )
   {
    conditions.Price = {$lte : range1 } ;
   }
   else if (range2 != "" )
   {
    conditions.Price = {$gte : range2} ;
    
   }

   if (carname != "" )
   {
    conditions.Carname = carname
      
   }

    car.deleteMany( conditions, (err) => {
      res.redirect("/cars");
    
    });
});

// GET the Car Details page in order to edit an existing Car
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   let id = req.params.id;
   let contactitem = car.findOne({ _id: id }).then( ( item) => {
       
    res.render("cars/details", {
      title: "Cars - modifty",
      cars: item,
    });
       
   });

   
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;
   let carobject = {
      Carname : req.body.Carname,
      Category : req.body.Category,
      Carmodel : req.body.Carmodel,
      Price : req.body.Price
    }

   car.updateOne( { _id: id }, carobject , (err , car) => {

    if (err)
    {
      return console.error(err);
    }
    else
    {
      res.redirect("/cars");
    }
   });
  
});



module.exports = router;
