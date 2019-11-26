var productsGlobal = [];
var menuResponsive = document.querySelector(".Hmenu");
var mainNav = document.querySelector(".mainnav");
var btnRespon = document.querySelector(".nav-responsive__logo");
var overflow = document.querySelector(".bodyOverflow");
var wrap = document.querySelector(".layer");


function handleOpenResponsive(){
  mainNav.classList.toggle("mainnav--active");
  btnRespon.classList.toggle("nav-responsive__logo--active");
  overflow.classList.toggle("bodyOverflow--active");
  wrap.classList.toggle("layer--active");


}


menuResponsive.addEventListener("click", handleOpenResponsive);




class Store {
  constructor() {
    this.rederizando = false;
    this.priceDataBuy = document.querySelector("#priceViewB");
    this.renderStorage = document.querySelector(".productsAddedC");
    this.renderAddBtn = document.querySelectorAll(".btnaddg");
    this.configStore();

    this.getAllProducts();
    this.renderCountCart = document.querySelector(".carshop__lenght");
    this.priceData = document.querySelector("#priceView");

    this.totalPrice = 0;

    this.observer = undefined;
    this.observerB = undefined;
  }

  createObserver(url) {
    this.observer = document.querySelector(url);
  }

  createObserverB(url) {
    this.observerB = document.querySelector(url);
  }

  configStore() {
    if (this.renderAddBtn != null) {
      this.renderAddBtn.forEach(btn => {
        btn.addEventListener("click", event => {
          event.preventDefault();
          var id = btn.getAttribute("data-name");
          this.addProducts(id);
        });
      });
    }
  }

  getAllProducts() {
    this.updateServer(products => {
      console.log(products);
      products.forEach(p => {
        var product = new Product(
          p._id,
          p.image,
          p.name,
          p.price,
          p.danger,
          this
        );
        productsGlobal.push(product);
      });
      this.update();
    });
  }

  addProducts(id) {
    this.addProductServer(id, p => {
      var product = new Product(
        p._id,
        p.image,
        p.name,
        p.price,
        p.danger,
        this
      );
      productsGlobal.push(product);

      this.update();
    });
  }

  delete(product) {
    this.removeProductServer(product, () => {
      var index = productsGlobal.indexOf(product);
      productsGlobal.splice(index, 1);
      this.update();
    });
  }

  getRef(name) {
    let ref = undefined;
    for (let i = 0; i < productsGlobal.length; i++) {
      let producto = productsGlobal[i];
      if (producto.name == name) {
        ref = producto;
        i = productsGlobal.length;
      }
    }
    return ref;
  }

  deleteAll(products) {
    this.removeAllServer();
    productsGlobal = [];
    this.update();
  }

  removeAllServer() {
    var promise = fetch("/api/cart/deleteall", {
      method: "DELETE"
    });

    promise
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  }

  update() {
    var duplicateProducts = [];
    this.renderCountCart.innerHTML = productsGlobal.length;
    this.renderStorage.innerHTML = "";
    if (this.observer) {
      this.observer.innerHTML = "";
    }
    if (this.observerB) {
      this.observerB.innerHTML = "";
    }
    this.totalPrice = 0;
    productsGlobal.forEach(product => {
      this.totalPrice += product.price;

      let found = false;
      duplicateProducts.forEach(duplicateProduct => {
        if (duplicateProduct.name == product.name) {
          duplicateProduct.cont += 1;
          duplicateProduct.setCount(duplicateProduct.cont);
          found = true;
        }
      });
      if (!found) {
        product.setCount(1);
        duplicateProducts.push(product);
      }
    });

    duplicateProducts.forEach(duplicateProduct => {
      this.renderStorage.appendChild(duplicateProduct.render());
      if (this.observer) {
        this.observer.appendChild(duplicateProduct.createNewView());
      }
      if (this.observerB) {
        this.observerB.appendChild(duplicateProduct.createNewViewB());
      }
    });
    this.actualizarPriceTotal();
  }
  /*
  update() {
   
    var duplicateProducts = [];
    this.renderCountCart.innerHTML = productsGlobal.length;
    this.renderStorage.innerHTML = "";

    this.totalPrice = 0;
    productsGlobal.forEach(product => {
      this.totalPrice += product.price;

      let found = false;
      duplicateProducts.forEach(duplicateProduct => {
        if (duplicateProduct.name == product.name) {
          duplicateProduct.cont += 1;
          duplicateProduct.setCount(duplicateProduct.cont);
          found = true;
        }
      });
      if (!found) {
        product.setCount(1);
        duplicateProducts.push(product);
      }
    });

    

    duplicateProducts.forEach(duplicateProduct => {
      this.renderStorage.appendChild(duplicateProduct.render());

      if (this.observer) {
       this.observer.appendChild(duplicateProduct.createNewView());
      }
    });

    console.log(duplicateProducts);

    this.actualizarPriceTotal();
  }
*/
  actualizarPriceTotal() {
    if (this.priceData != null) {
      this.priceData.innerHTML = `TOTAL:   $${this.totalPrice}`;
    }

    if (this.priceDataBuy != null) {
      this.priceDataBuy.innerHTML = `TOTAL:   $${this.totalPrice}`;
    }
  }

  addProductServer(id, load) {
    var promise = fetch("/api/cart/" + id, {
      method: "POST"
    });

    promise
      .then(function(response) {
        return response.json();
      })
      .then(function(product) {
        console.log(product);

        if (load) {
          // Respuesta
          load(product);
        }
      });
  }

  removeProductServer(product, load) {
    var promise = fetch("/api/cart/" + product.id, {
      method: "DELETE"
    });

    promise
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        console.log(data.cartList);
        if (load) {
          load();
        }
      });
  }

  updateServer(load) {
    var promise = fetch("/api/cart/product", {
      method: "GET"
    });

    promise
      .then(function(response) {
        return response.json();
      })
      .then(function(products) {
        if (load) {
          load(products);
        }
      });
  }
}

class Product {
  constructor(id, image, name, price, danger, store) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.price = price;
    this.danger = danger;
    this.element = document.createElement("div");
    this.store = store;
    this.element.classList.add("generalproductAdd");
    this.renderCont = undefined;
    this.cont = 1;

    this.createView();
  }
  createView() {
    this.element.innerHTML = `
        <div class="btndeleteP"><a class="btndeleteP__link" data-name="${this.id}"><img class="imgbtndelete"
        src="/images/add.png" alt=""></a>
        </div>
        
        <img class="counterPcont" src="/images/number.png" alt="">
        <h1 class="count" style="z-index:999;">${this.cont}</h1>
        
        
        <a href="/product/${this.id}/${this.danger}"> <img class="imgProductAdd" src="${this.image}" alt=""></a>
        
        <a class="name" href="/product/${this.id}/${this.danger}">${this.name}</a>
        <p class="pricePadd">$${this.price}</p>`;

    var btn__delete = this.element.querySelector(".btndeleteP__link");
    btn__delete.addEventListener("click", () => {
      this.delete();
    });

    this.renderCont = this.element.querySelector(".count");
    this.renderCont.innerHTML = this.cont;
  }

  createNewView() {
    var elementoNew = document.createElement("div");
    elementoNew.classList.add("generalproductAdd");
    elementoNew.innerHTML = `
        <div class="btndeleteP"><a class="btndeleteP__link" data-name="${this.id}"><img class="imgbtndelete"
        src="/images/add.png" alt=""></a>
        </div>
        
        <img class="counterPcont" src="/images/number.png" alt="">
        <h1 class="count" style="z-index:999;">${this.cont}</h1>
        
        
        <a href="/product/${this.id}/${this.danger}"> <img class="imgProductAdd" src="${this.image}" alt=""></a>
        
        <a class="name" href="/product/${this.id}/${this.danger}">${this.name}</a>
        <p class="pricePadd">$${this.price}</p>`;

    var btn__delete = elementoNew.querySelector(".btndeleteP__link");
    btn__delete.addEventListener("click", () => {
      this.delete();
    });

    return elementoNew;
  }

  createNewViewB() {
    var elementoNew = document.createElement("div");
    elementoNew.classList.add("generalproductAdd");
    elementoNew.innerHTML = `
      
        <img class="counterPcont" src="/images/number.png" alt="">
        <h1 class="count" style="z-index:999;">${this.cont}</h1>
        
        
        <a href="/product/${this.id}/${this.danger}"> <img class="imgProductAdd" src="${this.image}" alt=""></a>
        
        <a class="name" href="/product/${this.id}/${this.danger}">${this.name}</a>
        <p class="pricePadd">$${this.price}</p>`;

  

    return elementoNew;
  }

  setCount(number) {
    this.cont = number;
    this.renderCont.innerHTML = this.cont + "";
  }

  render() {
    return this.element;
  }

  delete() {
    this.store.delete(this);
  }
}

/**Config */

var store = new Store();
