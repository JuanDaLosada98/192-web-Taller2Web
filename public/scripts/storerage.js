class Store {
  constructor() {
    this.renderStorage = document.querySelector(".productsAddedC");
    this.products = [];
    this.renderAddBtn = document.querySelectorAll(".btnaddg");
    this.renderCountCart = document.querySelector(".carshop__lenght");
    this.priceData = document.querySelector("#priceView");
    this.configStore();
    this.getAllProducts();
    this.totalPrice = 0;
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
        this.products.push(product);
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
      this.products.push(product);

      this.update();
    });
  }

  delete(product) {
    this.removeProductServer(product, () => {
      var index = this.products.indexOf(product);
      this.products.splice(index, 1);
      this.update();
    });
  }

  deleteAll(products) {
    this.removeAllServer();
    this.products = [];
    this.update();

  }

  removeAllServer() {
    var promise = fetch("/api/cart/deleteall", {
      method: "DELETE"
    });

    promise
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

      });
  }

  update() {
    var duplicateProducts = [];
    this.renderCountCart.innerHTML = this.products.length;
    this.renderStorage.innerHTML = "";
    this.totalPrice = 0;
    this.products.forEach(product => {

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
    });
    this.actualizarPriceTotal();
  
  }

  actualizarPriceTotal() {
    if (this.priceData != null) {
      this.priceData.innerHTML = this.totalPrice;
    }
  }

  addProductServer(id, load) {
    var promise = fetch("/api/cart/" + id, {
      method: "POST"
    });

    promise
      .then(function (response) {
        return response.json();
      })
      .then(function (product) {
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
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
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
      .then(function (response) {
        return response.json();
      })
      .then(function (products) {
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
