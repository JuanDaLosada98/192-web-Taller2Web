const assert = require("assert");
const ObjectID = require("mongodb").ObjectID;

var cartList = [];
var ListSProducts = [];



function createRoutes(app, db) {
  app.get("/", (request, response) => {
    console.log("Alguien entró a la ruta inicial");
    response.sendFile(__dirname + "/public/index.html");
  });



  /*
    app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        const products = db.collection('products');
        var query = {};

        var esId = false;
        products.find({})
            // transformamos el cursor a un arreglo
            .toArray((err, result) => {
                // asegurarnos de que no hay error

                //

                var c = 0;
                var cont = 0;
                
                for (c; c < result.length; c++) {
                    if (request.params.id.toString() === result[c]._id.toString()) {
                        esId = true;
                        cartList.push(result[c]);

                        cont += 1;
                    }
                }

                if (!esId) {
                    response.send({
                        message: 'error',
                        cartLength: cartList.length,
                        cartList: cartList
                        
                    });
                    return;
                }


                console.log("cartList[0]");
                response.send({
                    cartLength: cartList.length,
                    cartList: cartList    
                });

            });

    });
    */

  app.get("/api/cart/:id", (request, response) => {
    response.send(cartList);
  });

  app.post("/api/cart/:id", (request, response) => {
    var id = request.params.id;

    const products = db.collection("products");

    var esId = false;
    products
      .find({})
      // transformamos el cursor a un arreglo
      .toArray((err, result) => {
        // asegurarnos de que no hay error
        var product = null;
        for (let c = 0; c < result.length; c++) {
          if (id.toString() === result[c]._id.toString()) {
            esId = true;
            product = result[c];
            cartList.push(product);
          }
        }

        if (!esId) {
          response.send({
            message: "error",
            cartList: product
          });
          return;
        } else {
          response.send(product);
        }
      });
  });

  ///////////////////////////////////////////////////////////////////

  app.post("/addToSame/:id/:index", (request, response) => {
    var id = request.params.id;
    var index = request.params.index;
    console.log(index);
    ListSProducts = [];
    console.log(ListSProducts.length);
    const products = db.collection("products");
    products
      .find({})
      // transformamos el cursor a un arreglo
      .toArray((err, result) => {
        // asegurarnos de que no hay error
        var product = null;

        for (let c = 0; c < result.length; c++) {
          if (id.toString() === result[c]._id.toString()) {
            esId = true;
            product = result[c];
            for (let a = 0; a < index; a++) {
                ListSProducts.push(product);
            }       
          }         
        }

      
          response.send(product);
        
      });
  });

  ///////////////////////////////////////////////////////////////////////////

  app.delete("/api/cart/:id", (request, response) => {
    var id = request.params.id;

    for (let i = 0; i < cartList.length; i++) {
      let product = cartList[i];

      if (id == product._id) {
        cartList.splice(i, 1);
        i = cartList.length;
      }
    }

    if (id === "deleteall") {
      cartList = [];
    }

    response.send(cartList);
  });

  app.get("/product/:id/:danger", function(req, res) {
    var id = req.params.id;
    var danger = req.params.danger;
    const products = db.collection("products");
    var data = {
      danger: danger
    };
    var query = {};
    products
      .find(query)
      // transformamos el cursor a un arreglo
      .toArray((err, result) => {
        // asegurarnos de que noh ay error
        data.recomend = [];

        var productsRecomend = [];
        //
        var c = 0;
        for (c; c < result.length; c++) {
          if (id.toString() === result[c]._id.toString()) {
            (result[c].cartLength = cartList.length),
              (data.product = result[c]);
          }
          productsRecomend.push(result[c]);
        }

        function shuffle(a) {
          var j, x, i;
          for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
          }
          return a;
        }

        shuffle(productsRecomend);

        for (let i = 0; i < productsRecomend.length; i++) {
          let product = productsRecomend[i];

          if (
            danger == product.danger.toString() &&
            id.toString() != product._id.toString() &&
            data.recomend.length < 3
          ) {
            data.recomend.push(product);
          }
        }

        res.render("product", data);
      });
  });

  app.get("/store", (request, response) => {
    const products = db.collection("products");
    //console.log(cartList);

    //buscamos todos los productos
    products
      .find({})
      //transformamos el cursor a una arreglo
      .toArray((err, result) => {
        //aseguramos de que no hay error
        assert.equal(null, err);
        var listCopy = result.slice();

        if (request.query.filter == "0-$10.000") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.price >= 0 && elem.price <= 10000) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "$10.000-$20.000") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.price >= 10000 && elem.price <= 20000) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "$20.000-$30.000") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.price >= 20000 && elem.price <= 30000) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "$30.000-$40.000") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.price >= 30000 && elem.price <= 40000) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "$40.000-$50.000") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.price >= 40000 && elem.price <= 50000) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "$50.000-$100.000") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.price >= 50000 && elem.price <= 100000) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "big") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.size === 3) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "medium") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.size === 2) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "small") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.size === 1) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "plasma") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.danger === 1) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "electric") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.danger === 2) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "plumb") {
          listCopy = listCopy.filter(function(elem) {
            if (elem.danger === 3) {
              return true;
            } else {
              return false;
            }
          });
        }

        if (request.query.filter == "fromoreless") {
          listCopy.sort(function(a, b) {
            return b.popularity - a.popularity;
          });
        }

        if (request.query.filter == "fromlessmore") {
          listCopy.sort(function(a, b) {
            return a.popularity - b.popularity;
          });
        }

        if (request.query.filter == "lh") {
          listCopy.sort(function(a, b) {
            return a.price - b.price;
          });
        }

        if (request.query.filter == "high to low") {
          listCopy.sort(function(a, b) {
            return b.price - a.price;
          });
        }

        if (request.query.filter == "from more to less") {
          listCopy.sort(function(a, b) {
            return b.rareness - a.rareness;
          });
        }

        if (request.query.filter == "from less to more") {
          listCopy.sort(function(a, b) {
            return a.rareness - b.rareness;
          });
        }

        var context = {
          products: listCopy
        };

        response.render("store", context);
      });
  });

  app.post("/ordersbuyall", (request, response) => {
    // console.log(request.body.metodoDePago);
    if (
      cartList.length != 0 &&
      request.body.namedata != "" &&
      request.body.iddata != "" &&
      request.body.dirdata != "" &&
      request.body.metodoDePago != undefined
    ) {
      const orders = db.collection("orders");
      request.body.cartList = cartList;

      orders.insertOne(request.body);

      response.send({ message: "ok, all products ordered" });
      redirect("/");
    } else {
      response.send({
        message:
          "you don't have products added in the cart or make sure you complete all empty spaces"
      });
    }
  });
  app.post("/ordersbuynow", (request, response) => {
    if (
      request.body.namedata != "" &&
      request.body.iddata != "" &&
      request.body.dirdata != "" &&
      request.body.metodoDePago != undefined
    ) {
      const orders = db.collection("orders");
      request.body.ListSProducts = ListSProducts;

      orders.insertOne(request.body);

      response.send({ message: "ok, all products of the same ordered" });
      console.log(ListSProducts.length);
      ListSProducts = [];
      redirect("/");
     
    } else {
      response.send({ message: "make sure you complete all empty spaces" });
      
    }
  });

 
}
module.exports = createRoutes;
