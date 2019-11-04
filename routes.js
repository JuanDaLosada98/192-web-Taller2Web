const assert = require('assert');
const ObjectID = require ('mongodb').ObjectID;

var cartList = [];

function createRoutes (app, db) {

    app.get('/', (request, response) => {
        console.log('Alguien entró a la ruta inicial');
        response.sendFile(__dirname + '/public/index.html');
    });

    // app.get('/tiendass', (request, response) => {
    //     console.log('Alguien entró a la tienda');
    //     response.render('store');
    // });
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
                        cartLength: cartList.length
                    });
                    return;
                }


                console.log("cartList[0]");
                response.send({
                    cartLength: cartList.length
                });

            });



    });
    app.get('/store', (request, response) => {
        const products = db.collection('products');
        console.log('Alguien entró a la tienda');

        //buscamos todos los productos
        products.find({})
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

                if (request.query.filter == 'fromoreless') {
                    listCopy.sort(function(a, b) {
                        return b.popularity - a.popularity;
                    });
                }

                if (request.query.filter == 'fromlessmore') {
                    listCopy.sort(function(a, b) {
                        return a.popularity - b.popularity;
                    });
                }
                
                if (request.query.filter == 'lh') {
                    listCopy.sort(function(a, b) {
                        return a.price - b.price;
                    });
                }

                if (request.query.filter == 'high to low') {
                    listCopy.sort(function(a, b) {
                        return b.price - a.price;
                    });
                }

                if (request.query.filter == 'from more to less') {
                    listCopy.sort(function(a, b) {
                        return b.rareness - a.rareness;
                    });
                }

                if (request.query.filter == 'from less to more') {
                    listCopy.sort(function(a, b) {
                        return a.rareness - b.rareness;
                    });
                }

                var context = {
                    products: listCopy
                };


                response.render('store',context);
        });
    });
}
    module.exports = createRoutes;